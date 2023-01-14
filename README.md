# Andrii-Batrinac-Ambrinos
Proiect 6 - Aplicație web acordarea de feedback continuu

Instructiuni de initializare proiect.
1. In directorul `backend` rulați `npm install`
2. In directorul `frontend` rulați `npm install`
3. Pentru a rula backend-ul se navigheaza la directorul `backend` si se ruleaza `npm run dev`
4. Pentru a rula frontend-ul se navigheaza la directorul `frontend` si se ruleaza `npm run dev`

Note: Rularea se face in ordinea mentionata, daca se ruleaza frontendul primul nu se face conexiunea cu backend-ul. (Backend-ul trebuie sa fie pe portul 3000, iar frontend-ul pe 3001)

Descriere si functionalitati:
Platforma beneficiaza de un sistem de log-in si register pentru studentii noi, in cazul in care un student nu doreste sa isi faca cont acesta poate alege varianta de logare ca oaspete. Cu sesiunea de oaspete un student se poate inregistra la un curs insa acesta poate folosi acea sesiune doar o zi, dupa care trebuie sa isi creeze o noua sesiune.

Pagina de vizualizare cursuri si inregistrare la cursuri este protejata in cazul in care un student nu este autentificat. Pagina de profesori este de asemenea protejata, utilizatorul fiind nevoit sa fie marcat ca profesor pentru a o accesa.

In urma autentificarii, in cazul in care un student are rolul de "student" acesta va vedea pagina specifica cu cursurile la care s-a inregistrat.
De asemenea, se poate inscrie la un curs nou pe baza unui cod unic de activitate.
La fiecare activitate afisata in lista, studentul poate reactiona in 4 moduri in mod continuu, o data la 10 secunde (limita care este impusa in cazul in care un student doreste sa strice numarul de voturi prin adaugarea prea multor feedback-uri)

Daca rolul este de "profesor" acesta va avea acces sa creeze cursuri si sa vada cursurile create si sa le actualizeze. Ruta de backend este de asemenea protejata pentru utilizatorii care sunt profesori.
Activitatea nou definita de profesor va continte un titlu, o descriere, un cod unic, o data de inceput si o data de final.
Pentru fiecare activitate, profesorul poate vizualiza in timp real reactiile studentilor - momentul de timp si feedback-ul acordat.

Baza de date utilizata este PostgreSQL. Pentru a hosta aceasta baza de date am utilizat platforma Supabase (fiind o solutie gratis).
Structura este detaliata in poza de mai jos.

<img width="641" alt="Screenshot 2023-01-15 at 00 33 12" src="https://user-images.githubusercontent.com/101119883/212500033-16405e90-361b-4428-bad3-e6b438133a7a.png">
