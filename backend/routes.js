import express from "express";
const router = express.Router();
import supabase from "./configSupabase.js";
import bcrypt from "bcrypt";

router.post("/register", async (req, res) => {
  if (Object.keys(req.body).length < 2) {
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
      .insert([{ email: email, password: password, listActivities: [] }]);

    if (!data)
      res.status(200).json({
        message: "Inregistrare efectuata cu succes!",
      });
    else res.status(400).json({ message: "Inregistrare neefectuata!" });
  }
});

router.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  let { data: users, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email);
  if (!users[0]) res.status(400).json({ message: "Nu exista email!" });
  else {
    const cmp = await bcrypt.compare(pass, users[0].password);
    if (cmp)
      res.status(200).json({
        message: "Logare efectuata cu succes!",
        isProffesor: users[0].isProffesor,
      });
    else res.status(400).json({ message: "Date invalide!" });
  }

  //   let password;

  //   bcrypt.hash(pass, 10, function (err, hash) {
  //     password = hash;
  //   });

  //res.send(users)
  //   $2b$10$FoSwWZlygAt9h.YhN9RVk.LTaMb.XblU7JyqA1csY20uSq04CdKdy
});

router.post("/get-cursuri", async (req, res) => {
  const { idUser } = req.body;
  let { data: users, error } = await supabase
    .from("users")
    .select("listActivities")
    .eq("id", idUser);
  if (users[0]) {
    const list = users[0].listActivities;
    let { data: activities, error } = await supabase
      .from("activities")
      .select("*")
      .in("id", list);
    res.send(activities);
  } else res.status(400).json({ message: "Id user invalid" });
});

router.patch("/inscriere-curs", async (req, res) => {
  const { idStudent, code } = req.body;

  let date = new Date().toISOString().toLocaleString("zh-TW");
  let { data: activities, err } = await supabase
    .from("activities")
    .select("*")
    .eq("code", code)
    .lte("date_start", date)
    .gte("date_final", date);

  let idActivity;
  if (activities[0]) {
    idActivity = activities[0].id;
    let { data: users, er } = await supabase
      .from("users")
      .select("listActivities")
      .eq("id", idStudent);

    // // res.send(date)
    users[0].listActivities.push(idActivity);
    const { data, error } = await supabase
      .from("users")
      .update({ listActivities: users[0].listActivities })
      .eq("id", idStudent)
      .select();

    if (!data) res.status(400).json({ message: error });
    else {
      res.status(200).json({ message: "update succes" });
    }
  } else {
    res.status(400).json({ message: "nu exista activitatea" });
  }
});

router.post("/creare-curs", async (req, res) => {
  const { idUser, title, description, code, date_start, date_final } = req.body;
  let { data: users, error } = await supabase
    .from("users")
    .select("*")
    .eq("isProffesor", true)
    .eq("id", idUser);
  if (users) {
    const { data, error } = await supabase
      .from("activities")
      .insert([
        {
          title: title,
          description: description,
          code: code,
          date_start: date_start,
          date_final: date_final,
        },
      ])
      .select();

    users[0].listActivities.push(data[0].id);
    const { dataUpdate, er } = await supabase
      .from("users")
      .update({ listActivities: users[0].listActivities })
      .eq("id", idUser)
      .select();

    res.status(200).json({ message: "Activitatea creata cu succes!" });
  } else {
    res.status(400).json({ message: "Id profesor invalid!" });
  }
});

router.patch("/update-curs", async (req, res) => {
  const { idCurs, title, description, code, date_start, date_final } = req.body;

  const { data, error } = await supabase
    .from("activities")
    .update({
      title: title,
      description: description,
      code: code,
      date_start: date_start,
      date_final: date_final,
    })
    .eq("id", idCurs)
    .select();

  if (!data) res.status(400).json({ message: "Update activitate neefectuat!" });
  else res.status(200).json({ message: "Update activitate efectuat cu succes!" });
});

router.post("/feedback", (req, res) => { });

router.get("/get-feedback", (req, res) => { });

export default router;
