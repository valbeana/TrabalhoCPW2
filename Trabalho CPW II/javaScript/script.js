document.getElementById('search-btn').addEventListener('click', function () {
    const searchTerm = document.getElementById('search-term').value;
    if (searchTerm.trim() === '') {
        alert('Please enter a word to search');
        return;
    }

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`)
        .then(response => response.json())
        .then(data => {
            displayResults(data);
        })
        .catch(error => {
            console.error('Error fetching the data:', error);
            alert('No results found or API error');
        });
});

function displayResults(results) {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = ''; // Clear previous results

    if (results.title === 'No Definitions Found') {
        resultsContainer.innerHTML = `<p>No definitions found for this word.</p>`;
        return;
    }

    results.forEach((result, index) => {
        const item = document.createElement('div');
        item.classList.add('result-item');
        item.textContent = result.word;

        item.addEventListener('click', function () {
            displayWordDetails(result);
        });

        resultsContainer.appendChild(item);
    });
}

function displayWordDetails(wordData) {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = ''; // Clear results

    const word = document.createElement('h2');
    word.textContent = wordData.word;

    const meaningsList = document.createElement('ul');
    wordData.meanings.forEach(meaning => {
        const listItem = document.createElement('li');
        listItem.textContent = `${meaning.partOfSpeech}: ${meaning.definitions[0].definition}`;
        meaningsList.appendChild(listItem);
    });

    const audioContainer = document.createElement('div');
    if (wordData.phonetics.length > 0 && wordData.phonetics[0].audio) {
        const audio = document.createElement('audio');
        audio.src = wordData.phonetics[0].audio;
        audio.controls = true;
        audioContainer.appendChild(audio);
    }

    resultsContainer.appendChild(word);
    resultsContainer.appendChild(meaningsList);
    resultsContainer.appendChild(audioContainer);
}
