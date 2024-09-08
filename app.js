// Define function for DOM Content Loaded event
document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('form');
    var resumeOutput = document.getElementById('resume-output');
    var profilePicInput = document.getElementById('profilePic');
    // Add event listener for form submission
    form.addEventListener('submit', function (event) {
        var _a;
        event.preventDefault(); // Prevent the form from submitting traditionally
        // Get the form data
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;
        var education = document.getElementById('education').value;
        var experience = document.getElementById('experience').value;
        var skills = document.getElementById('skills').value;
        // Check if a profile picture has been uploaded
        var profilePicFile = (_a = profilePicInput.files) === null || _a === void 0 ? void 0 : _a[0];
        var profilePicURL = '';
        if (profilePicFile) {
            // Create a FileReader to read the uploaded image and convert it to a URL
            var reader = new FileReader();
            reader.onload = function (e) {
                if (e.target && e.target.result) {
                    profilePicURL = e.target.result;
                    generateResume(profilePicURL);
                }
            };
            reader.readAsDataURL(profilePicFile); // Convert image to data URL
        }
        else {
            // No image selected, just generate the resume without the profile picture
            generateResume('');
        }
        // Function to generate the resume dynamically
        function generateResume(imageURL) {
            var imageHTML = '';
            if (imageURL) {
                imageHTML = "<img src=\"".concat(imageURL, "\" alt=\"Profile Picture\" style=\"width:150px;height:150px;border-radius:50%;\"><br><br>");
            }
            // Generate the dynamic resume
            var resumeHTML = "\n                ".concat(imageHTML, "\n                <h2>").concat(name, "</h2>\n                <p><strong>Email:</strong> ").concat(email, "</p>\n                <p><strong>Phone:</strong> ").concat(phone, "</p>\n\n                <h3>Education</h3>\n                <p>").concat(education, "</p>\n\n                <h3>Experience</h3>\n                <p>").concat(experience, "</p>\n\n                <h3>Skills</h3>\n                <p>").concat(skills, "</p>\n            ");
            // Clear the previous resume and insert the new one
            resumeOutput.innerHTML = resumeHTML;
        }
    });
});
