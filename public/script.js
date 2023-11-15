document.getElementById('projectThesis').addEventListener('click', () => {
    let element = document.querySelector('input[name="projectThesis"]:checked');
    let facultyElement = document.getElementById('faculty');
    let titleElement = document.getElementById('title');
    if (element != null) {
        facultyElement.disabled = false;
        titleElement.disabled = false;
    }
})
const addCourses = () => {
    let element = document.getElementById('numCourses');
    let courseGroup = document.getElementById('courseGroup');
    let numCourses = parseInt(element.value);
    if (courseGroup.hasChildNodes()) {
        return
    }
    for (let course = 0; course < numCourses; course++) {
        const div = document.createElement('div');
        div.className = 'input-group input-text';
        div.name = 'Courses'
        div.innerHTML = `
            <input class='form-control' name=Courses[${course}][cid] type='text' aria-label='CourseID' autocomplete='off' placeholder='Course ID'>
            <input class='form-control' name=Courses[${course}][name] type='text' aria-label='CourseName' autocomplete='off' placeholder='Course Name'>
        `;
        courseGroup.appendChild(div);
    }
    element.disabled = true;
}

const addAddresses = () => {
    let element = document.getElementById('numAddresses');
    let addressGroup = document.getElementById('addressGroup');
    let numAddresses = parseInt(element.value);
    if (addressGroup.hasChildNodes()) {
        return
    }
    for (let address = 0; address < numAddresses; address++) {
        const div = document.createElement('div');
        div.className = 'input-group input-text';
        div.name = 'Addresses'
        div.innerHTML = `
            <input class='form-control' name=Addresses[${address}][street] type='text' aria-label='Street' autocomplete='off' placeholder='Street'>
            <input class='form-control' name=Addresses[${address}][city] type='text' aria-label='City' autocomplete='off' placeholder='City'>
            <input class='form-control' name=Addresses[${address}][state] type='text' aria-label='State' autocomplete='off' placeholder='State'>
            <input class='form-control' name=Addresses[${address}][country] type='text' aria-label='Country' autocomplete='off' placeholder='Country'>
            <input class='form-control' name=Addresses[${address}][pincode] type='text' aria-label='Pincode' autocomplete='off' placeholder='Pincode'>
        `;
        addressGroup.appendChild(div);
    }
    element.disabled = true;
}
