import express from "express";
import supabase from "./configSupabase.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import authorize from "./middleware/authorization.js";
import crypto from "crypto";
const router = express.Router();

//Generate jwt token, expires in 1 day
function generateAccessToken(user) {
  return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '24h' });
}

//Register student
router.post("/register", async (req, res) => {
  try {
    if (Object.keys(req.body).length != 2) {
      res.status(400).json({ message: "Data incorrect in body" });
      return;
    }
    const { email, pass } = req.body;
    let { data: users, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email);
    if (users[0]) res.status(400).json({ message: "Acest email exista deja!" });
    else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(pass, salt);
      let password = hashedPassword;

      const { data, error } = await supabase
        .from("users")
        .insert([{ email: email, password: password, listActivities: [], isProffesor: false }])
        .select();

      //Generate token for user id
      let token = generateAccessToken(data[0].id);

      //Set httpOnly cookie with token
      res.cookie('token', token, {
        path: '/',
        httpOnly: true,
        expires: new Date(Date.now() + 86400000),
      });

      if (!data) res.status(400).json({ message: error });
      else {
        res.status(200).json({ message: "Inregistrare efectuata cu succes!", user: data[0], token });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
});

//Register student
router.post("/register-guest", async (req, res) => {
  try {
    const random = crypto.randomUUID()
    const email = 'guest@' + random;
    const { data, error } = await supabase
      .from("users")
      .insert([{ email, password: 'do-not-delete', listActivities: [], isProffesor: false }])
      .select();

    //Generate token for user id
    let token = generateAccessToken(data[0].id);

    //Set httpOnly cookie with token
    res.cookie('token', token, {
      path: '/',
      httpOnly: true,
      expires: new Date(Date.now() + 86400000),
    });

    if (!data) res.status(400).json({ message: error });
    else {
      res.status(200).json({ message: "Logat ca oaspete!", user: data[0], token });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
    console.log(error);
  }
});

//Login student and professor
router.post("/login", async (req, res) => {
  try {
    const { email, pass } = req.body;
    let { data: users, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email);
    if (!users[0]) res.status(400).json({ message: "Nu exista email!" });
    else {
      const cmp = await bcrypt.compare(pass, users[0].password);
      if (!cmp) return res.status(400).json({ message: "Parola incorecta!" });

      //Generate token for user id
      let token = generateAccessToken(users[0].id);

      //Set httpOnly cookie with token
      res.cookie('token', token, {
        path: '/',
        httpOnly: true,
        expires: new Date(Date.now() + 86400000)
      });

      res.status(200).json({ message: "Login efectuat cu succes!", user: users[0], token });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
});

//Logout student and professor
router.get("/logout", async (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: "Logout efectuat cu succes!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
});

//Login status
router.get("/login-status", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(200).json(false);
    }
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      if (verified) {
        return res.status(200).json(true);
      } else {
        return res.status(200).json(false);
      }
    } catch (error) {
      return res.status(200).json(false); //Token invalid or expired -> jwt.verify throws error
    }

  } catch (error) {
    res.status(500).json({ message: "Server error", error: (process.env.NODE_ENV == 'dev' ? error.message : undefined) });
    console.log(error);
  }
});

//Get user data with authorization middleware
router.get("/user", authorize, async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
});

//Get cursuri for students and professors with authorization middleware
router.get("/cursuri", authorize, async (req, res) => {
  try {
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let { data, error } = await supabase
      .from("users")
      .select("listActivities")
      .eq("id", req.user.id);

    const list = data[0].listActivities;
    let { data: activities } = await supabase
      .from("activities")
      .select("*")
      .in("id", list)

    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
});

//Register in a course for student with authorization middleware
router.patch("/inscriere-curs", authorize, async (req, res) => {
  try {
    const { code } = req.body;

    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let { data: activities, err } = await supabase
      .from("activities")
      .select("*")
      .eq("code", code)
      .lte("date_start", date)
      .gte("date_final", date);

    let idActivity;
    if (activities[0]) {
      idActivity = activities[0].id;

      if (!req.user.listActivities.includes(idActivity))
        req.user.listActivities.push(idActivity);
      else return res.status(400).json({ message: "Esti deja inscris la acest curs!" });

      const { data, error } = await supabase
        .from("users")
        .update({ listActivities: req.user.listActivities })
        .eq("id", req.user.id)
        .select();

      if (data) {
        res.status(200).json({ message: "Inscriere efectuata cu success!", activity: idActivity });
      } else {
        res.status(400).json({ message: "Inscriere esuata!", error: error });
      }
    } else {
      res.status(400).json({ message: "Cursul nu mai este valid!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
});

//Register a new course for professor with authorization middleware
router.post("/creare-curs", authorize, async (req, res) => {
  try {
    const { title, description, code, date_start, date_final } = req.body;

    //verifica daca data de inceput este mai mica decat data de final
    const DateStart = new Date(date_start).toISOString();
    const DateFinal = new Date(date_final).toISOString();
    if (DateStart > DateFinal)
      return res.status(200).json({ message: "Data de inceput trebuie sa fie mai mica decat data de final!" });

    if (req.user.isProffesor) {
      let { data: activities, err } = await supabase
        .from("activities")
        .select("*")
        .eq("code", code);
      if (activities[0]) return res.status(400).json({ message: "Codul este deja folosit!" });

      const { data } = await supabase
        .from("activities")
        .insert([{ title, description, code, date_start, date_final }])
        .select();

      req.user.listActivities.push(data[0].id);

      //Update user listActivities
      await supabase
        .from("users")
        .update({ listActivities: req.user.listActivities })
        .eq("id", req.user.id)
        .select();

      res.status(200).json({ message: "Activitatea creata cu succes!", activity: data[0] });
    } else {
      res.status(400).json({ message: "Userul nu e profesor" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
});

//Update an existing course for professor
router.patch("/update-curs", authorize, async (req, res) => {
  try {
    const { id_curs, title, description, code, date_start, date_final } = req.body;

    const { data, error } = await supabase
      .from("activities")
      .update({ title, description, code, date_start, date_final })
      .eq("id", id_curs)
      .select();

    if (!data) res.status(400).json({ message: "Update activitate neefectuat!" });
    else res.status(200).json({ message: "Update activitate efectuat cu succes!", activity: data[0] });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
});

//Create a new feedback from student
router.post("/feedback", authorize, async (req, res) => {
  const { idActivity, feedback } = req.body;
  try {
    if (req.user.listActivities.includes(Number(idActivity))) {
      const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
      const { data: activities } = await supabase
        .from("activities")
        .select("*")
        .eq("id", idActivity)
        .lte("date_start", date)
        .gte("date_final", date)

      //verifica daca mai poate da feedback la curs pe baza datei
      if (!activities[0]) return res.status(400).json({ message: "Nu mai poti da feedback la acest curs, a expirat! ", feedback: null });

      //verifica daca au trecut 10 seunde de la ultimul feedback
      const dateFeedback = new Date();
      const lastFeedback = new Date(req.user.last_feedback);
      lastFeedback.setSeconds(lastFeedback.getSeconds() + 10);
      if (dateFeedback < lastFeedback) {
        return res.status(401).json({ message: "Poti da feedback o data la 10 secunde! ", feedback: null });
      }

      const { data } = await supabase
        .from('feedbacks')
        .insert([{ idActivity, type: feedback, idUser: req.user.id }])
        .select();
      if (data) {
        await supabase.from('users').update({ last_feedback: dateFeedback }).eq('id', req.user.id);
        res.status(200).json({ message: "Feedback creat cu succes!", feedback: data[0] });
      } else {
        res.status(400).json({ message: "Feedback nu a fost creat!" });
      }
    } else {
      res.status(400).json({ message: "Nu esti inscris la acest curs!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
    console.log(error.message)
  }
});

//Get feedbacks for professors
router.get("/feedback", authorize, async (req, res) => {
  const { idActivity } = req.query;
  try {
    const { data } = await supabase
      .from('feedbacks')
      .select("*")
      .eq("idActivity", idActivity)
      .select();
    if (data) {
      res.status(200).json({ message: "Feedbackuri gasite cu succes!", feedback: data });
    } else {
      res.status(400).json({ message: "Feedbackuri nu au fost gasite!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
});

export default router;
