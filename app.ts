// Define function for DOM Content Loaded event
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form') as HTMLFormElement;
    const resumeOutput = document.getElementById('resume-output') as HTMLDivElement;
    const profilePicInput = document.getElementById('profilePic') as HTMLInputElement;

    // Add event listener for form submission
    form.addEventListener('submit', (event: Event) => {
        event.preventDefault(); // Prevent the form from submitting traditionally

        // Get the form data
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const phone = (document.getElementById('phone') as HTMLInputElement).value;
        const education = (document.getElementById('education') as HTMLTextAreaElement).value;
        const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
        const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;

        // Check if a profile picture has been uploaded
        const profilePicFile = profilePicInput.files?.[0];
        let profilePicURL = '';

        if (profilePicFile) {
            // Create a FileReader to read the uploaded image and convert it to a URL
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                if (e.target && e.target.result) {
                    profilePicURL = e.target.result as string;
                    generateResume(profilePicURL);
                }
            };
            reader.readAsDataURL(profilePicFile); // Convert image to data URL
        } else {
            // No image selected, just generate the resume without the profile picture
            generateResume('');
        }

        // Function to generate the resume dynamically
        function generateResume(imageURL: string): void {
            let imageHTML = '';
            if (imageURL) {
                imageHTML = `<img src="${imageURL}" alt="Profile Picture" style="width:150px;height:150px;border-radius:50%;"><br><br>`;
            }

            // Generate the dynamic resume
            const resumeHTML = `
                ${imageHTML}
                <h2>${name}</h2>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>

                <h3>Education</h3>
                <p>${education}</p>

                <h3>Experience</h3>
                <p>${experience}</p>

                <h3>Skills</h3>
                <p>${skills}</p>
            `;

            // Clear the previous resume and insert the new one
            resumeOutput.innerHTML = resumeHTML;
        }
    });
});
