// Client-side validation or enhancements can be added here
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    const skills = document.getElementById('skills').value;
    if (skills.split(',').length < 2) {
      alert('Please enter at least two skills, separated by commas.');
      e.preventDefault();
    }
  });
});
