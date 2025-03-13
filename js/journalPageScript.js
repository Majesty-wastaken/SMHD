let currentPage = null;
let pageCount = 0;
let pages = [];

const clickSound = document.getElementById('click-sound');
const pageSound = document.getElementById('page-sound');

window.onload = function() {
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }

  const storedPages = JSON.parse(localStorage.getItem('pages'));
  if (storedPages) {
    pages = storedPages;
    pageCount = pages.length;

    pages.forEach((page, index) => {
      createPageButton(page.id, index + 1, page.done, page.title);
    });
  }

  document.getElementById('toggle-dark-mode').addEventListener('click', toggleDarkMode);
  document.getElementById('download-pdf').addEventListener('click', downloadPDF);

      
  document.getElementById('prev-page').addEventListener('click', goToPreviousPage);
  document.getElementById('next-page').addEventListener('click', goToNextPage);
};

function addNewPage() {
  pageSound.play();

  pageCount++;

  
  const pageTitle = prompt("Enter a title for the new page:", `Page ${pageCount}`);
  if (!pageTitle) {
    alert("Page title is required!");
    return;
  }

  const pageId = `page${pageCount}`;

  pages.push({
    id: pageId,
    title: pageTitle, 
    content: "",
    done: false
  });

  createPageButton(pageId, pageCount, false, pageTitle);
  savePages();
  selectPage(pageId, pageCount);
}

function createPageButton(pageId, pageNumber, done = false, pageTitle) {
  const button = document.createElement('button');
  button.innerText = pageTitle;

  if (done) {
    button.classList.add('done');
  }

  button.onclick = function() {
    clickSound.play();
    selectPage(pageId, pageNumber);   
    markPageAsDone(pageId, button);
  };

  button.ondblclick = function() {
       
    deletePage(pageId, button);
  };

  document.getElementById('page-buttons').appendChild(button);
}

function selectPage(pageId, pageNumber) {
  if (currentPage) {
   
    const previousButton = document.querySelector(`#page-buttons button.selected`);
    if (previousButton) {
      previousButton.classList.remove('selected');
    }
  }

  
  const currentButton = document.querySelector(`#page-buttons button:nth-child(${pageNumber})`);
  currentButton.classList.add('selected');

  
  currentPage = pageId;
  const page = pages.find(p => p.id === pageId);
  if (page) {
    document.getElementById('note-title').textContent = page.title;
    document.getElementById('note-content').value = page.content;
    updateCounters(page.content);
  }
}

function markPageAsDone(pageId, button) {
  const page = pages.find(p => p.id === pageId);
  if (page) {
    page.done = !page.done;
    if (page.done) {
      button.classList.add('done');
    } else {
      button.classList.remove('done');
    }
    savePages();
  }
}

function deletePage(pageId, button) {
  const pageIndex = pages.findIndex(p => p.id === pageId);
  if (pageIndex !== -1) {
    pages.splice(pageIndex, 1);
    document.getElementById('page-buttons').removeChild(button);
    savePages();

    if (currentPage === pageId) {
      currentPage = null;
      document.getElementById('note-title').textContent = 'Select a page';
      document.getElementById('note-content').value = '';
      updateCounters('');
    }
  }
}

function savePages() {
  localStorage.setItem('pages', JSON.stringify(pages));
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

function updateCounters(text) {
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const charCount = text.length;

  document.getElementById('word-count').innerText = wordCount;
  document.getElementById('char-count').innerText = charCount;
}

function downloadPDF() {
  if (!currentPage) {
    alert("Select a page first!");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const pageData = pages.find(p => p.id === currentPage);
  const content = pageData.content;

  doc.setFontSize(14);
  doc.text(`Notes - ${currentPage}`, 10, 10);
  doc.setFontSize(12);

  const splitText = doc.splitTextToSize(content, 180);
  doc.text(splitText, 10, 20);

  doc.save(`${currentPage}.pdf`);
}


function goToPreviousPage() {
  const currentPageIndex = pages.findIndex(page => page.id === currentPage);
  if (currentPageIndex > 0) {
    const previousPage = pages[currentPageIndex - 1];
    selectPage(previousPage.id, currentPageIndex);
  }
}


function goToNextPage() {
  const currentPageIndex = pages.findIndex(page => page.id === currentPage);
  if (currentPageIndex < pages.length - 1) {
    const nextPage = pages[currentPageIndex + 1];
    selectPage(nextPage.id, currentPageIndex + 2);
  }
}
