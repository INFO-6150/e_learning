document.getElementById('newCourseForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get the values from the form inputs
    var title = document.getElementById('courseTitle').value;
    var description = document.getElementById('courseDescription').value;

    // Create the new card element
    var newCard = document.createElement('div');
    newCard.className = 'col-md-4 mb-4';
    newCard.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${description}</p>
                <a href="#" class="btn btn-primary">View Course</a>
            </div>
        </div>
    `;

    // Add the new card to the row
    var coursesRow = document.querySelector('.row');
    coursesRow.appendChild(newCard);

    // Reset the form and hide the modal
    this.reset();
    $('#addCourseModal').modal('hide');
});
