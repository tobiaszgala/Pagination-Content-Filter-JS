// number of elements to be displayed on the page
const numOfElementsOnPage = 10;
// select first div with class of page (page container)
const pageContainer = document.querySelector(".page");
// select first ul element which contains elements to be displayed (student container)
const studentContainer = pageContainer.querySelector(".student-list");
// select all h3 tags which contain student name
const arrStudentNames = studentContainer.querySelectorAll(".student-details h3");
// select all email addresses
const arrStudentEmails = studentContainer.querySelectorAll(".student-details .email");
// select all children elements (students) on the page
const studentList = studentContainer.children;
// number of all elements (students) on the page
const numOfItems = studentList.length;

// array which holds results of search function
let listArr = [];
// info message placeholder to display message to the user
let infoMessage;
// search input element
let searchInput;

// this function generates all elements needed for javascript functionality
function generateHTMLElements() {
    // select page header
    const searchContainer = pageContainer.querySelector('.page-header');
    // create div element for search function
    let searchDiv = document.createElement('div');
    // create search input
    searchInput = document.createElement('input');
    // create info message placeholder
    infoMessage = document.createElement('p');
    // set class for search div
    searchDiv.className = 'student-search';
    // set placeholder value for search input
    searchInput.placeholder = 'Search for students...';
    
    // append info message to page container
    pageContainer.appendChild(infoMessage);
    // append search input to search div
    searchDiv.appendChild(searchInput);
    // append search div to search container
    searchContainer.appendChild(searchDiv);
}


// functions hide all children of student container
function hideElements() {
    for (let i = 0; i < numOfItems; i++) {
        studentList[i].style.display = "none";
    }
}

// function deletes buttons from the page
function deleteButtons() {
    let checkButtons = pageContainer.querySelector(".pagination");
    // remove buttons if they exist
    if (checkButtons)
        pageContainer.removeChild(checkButtons);
}

/*  
    function shows elements based on page number
    takes array as an argument and int for page number   
*/
function showElements(arrList, pageNum) {
    // call function to hide all elements
    hideElements();
    // numbers of elements in an array
    let numberOfElements = arrList.length;
    // calculate ending point of the loop
    let range = numOfElementsOnPage * pageNum;
    // calculate starting point of the loop
    let i = range - numOfElementsOnPage;
    
    for (i; i < range; i++) {
        /* 
            if i is greater of equals to number of elements in the array passed as argument
            break the loop
            
            it helps us to break the loop if there is less elements on the page
        */
        if (i >= numberOfElements)
            break;
        else
        // otherwise, set display property to block
            arrList[i].style.display = "block";
    }
    
}


// function display buttons on the page and bind event listeners 
function showButtons(arrList) {
    // calculate number of buttons, round the number to its nearest integer
    let numberOfButtons = Math.ceil(arrList.length / numOfElementsOnPage);
    // remove previous buttons if they exist
    deleteButtons();
    // set info message placeholder to empty string
    infoMessage.textContent = "";
    // call showElements function to display first page
    showElements(arrList, 1);

    // if number of buttons is less than 1 we don't want to display it
    if (numberOfButtons > 1) {
        // create ul for generated buttons
        let buttonUl = document.createElement('ul');
        // set className to pagination
        buttonUl.className = "pagination";

        // loop to create buttons based on calculated number
        for (let i = 1; i <= numberOfButtons; i++) {
            // create li element for each button
            let li = document.createElement('li');
            // create link tag for each button
            let a = document.createElement('a');
            // add text content to a tag with button number
            a.textContent = i;
            // add href attribute to each tag, # + button number
            a.href = "#" + i;
            // append a tag to li element
            li.appendChild(a);
            // append li tag to ul tag responsible for displaying buttons
            buttonUl.appendChild(li);
        }
        
        // append generated ul to page container 
        pageContainer.appendChild(buttonUl);
        
        // select buttons
        let button = pageContainer.querySelector('.pagination');
        // select all generated links
        let buttons = pageContainer.querySelectorAll('.pagination li a');
        // add active class to the first button
        buttons[0].classList.add('active');
        
        // even listener for pagination buttons
        button.addEventListener('click', function(e) {
            // get text content of clicked button
            let value = e.target.textContent;
            // remove class active if exists
            for (let i = 0; i < buttons.length; i++)
            {
                buttons[i].classList.remove('active');
            }
            // call function to display content for specific page
            showElements(arrList, value);
            // add active class to selected button
            e.target.classList.add('active');
        })
    }
    
}

// function for search functionality
function searchElements(searchInput) {
    // clear array which holds search results
    listArr = [];
    
    // loop through all items on the page (students)
    for (let i = 0; i < numOfItems; i++) {
        // if name or email address contains search input
        if (arrStudentNames[i].textContent.toUpperCase().indexOf(searchInput) > -1 ||
            arrStudentEmails[i].textContent.toUpperCase().indexOf(searchInput) > -1) {
            // add element to the array
            listArr.push(studentList[i]);
        }
    }
    
    // if array has results
    if (listArr.length) {
        // call showbuttons to display it
        showButtons(listArr);
    // if array is empty 
    } else if (listArr.length === 0) {
        // hide all elements
        hideElements();
        // remove all generated buttons
        deleteButtons();
        // set info info message placeholder
        infoMessage.textContent = 'No records found...';
    }
}


// generate elements
generateHTMLElements();
// showButtons to display first page
showButtons(studentList);


// bind event listener to search input
searchInput.addEventListener('keyup', function() {
    // pass search input value in upper case for better results
    searchElements(this.value.toUpperCase());
});
