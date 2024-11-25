async function fetchMalwareData() {
    // Get user input
    const malwareInput = document.getElementById('malware-input');
    const avListElement = document.getElementById('av-list');
    const query = malwareInput.value.trim(); // Trim any excess spaces

    // Check if the user input is empty
    if (!query) {
        avListElement.innerHTML = '<p>Please enter a malware name.</p>';
        return;
    }

    // Construct the API URL
    const url = `https://api.threatminer.org/v2/av.php?q=${query}&rt=1`;

    try {
        // Fetch data from the API
        const response = await fetch(url);

        // Check if the response is ok
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the response as JSON
        const data = await response.json();

        console.log('API Response:', data); // Log the raw response to the console

        // Check if there are any results
        if (data.status_code === "200" && Array.isArray(data.results) && data.results.length > 0) {
            let output = `<h2>Samples found for: ${query}</h2>`;
            output += `<ul>`;  // Start an unordered list

            // Limit the results to the latest 10 samples
            const resultsToDisplay = data.results.slice(0, 10); // Get only the first 10 results

            // Loop through each sample hash and format it
            resultsToDisplay.forEach((sample, index) => {
                output += `<li><strong>Sample ${index + 1}:</strong> Hash: <a href="https://www.virustotal.com/gui/file/${sample}" target="_blank">${sample}</a></li>`;            });

            output += `</ul>`;  // Close the unordered list

            // Display the results
            avListElement.innerHTML = output;
        } else {
            // Display message if no results were found
            avListElement.innerHTML = `<p>No samples found for malware: ${query}</p>`;
        }
    } catch (error) {
        // Handle any errors that occur during the fetch
        console.error('Error fetching data:', error);
        avListElement.innerHTML = `<p>Failed to load data. Error: ${error.message}</p>`;
    }
}