// Get references to the buttons and output elements
const button = document.getElementById("loadCourses");

// Get a reference to the output element where the courses will be displayed
const output = document.getElementById("output");

// Add an event listener to the button to fetch and display courses when clicked
button.addEventListener("click", async () => {
  // Fetch the list of courses from the server
  const response = await fetch("/courses");


  // Parse the JSON response into courses
  const courses = await response.json();

  // Update the output element with the list of courses
  output.innerHTML = courses

    // Create HTML for each course and join them into a single string
    .map((course) => {
      // Handle both nested object and string formats
      if (typeof course.title === 'object' && course.title !== null) {
        return `<p>${course.title.name} - ${course.title.semester} ${course.title.year}</p>`;
      } else {
        return `<p>${course.title} - Fall 2026</p>`;
      }
    })

    // Join the array of HTML strings into a single string
    .join("");
});
