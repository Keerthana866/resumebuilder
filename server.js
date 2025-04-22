const express = require('express');
const pdf = require('html-pdf');
const ejs = require('ejs');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
  res.render('index', { error: null });
});

app.post('/generate-resume', async (req, res) => {
  const { name, email, education, experience, skills } = req.body;

  // Basic validation
  if (!name || !email || !education || !experience || !skills) {
    return res.render('index', { error: 'All fields are required.' });
  }

  // Render resume template
  const resumeHtml = await ejs.renderFile(
    path.join(__dirname, 'views', 'resume.ejs'),
    {
      name,
      email,
      education: education.split('\n'),
      experience: experience.split('\n'),
      skills: skills.split(',').map(skill => skill.trim()),
    }
  );

  // PDF options
  const pdfOptions = { format: 'Letter' };

  // Generate PDF
  pdf.create(resumeHtml, pdfOptions).toBuffer((err, buffer) => {
    if (err) {
      console.error(err);
      return res.render('index', { error: 'Error generating resume.' });
    }
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=resume.pdf',
    });
    res.send(buffer);
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
