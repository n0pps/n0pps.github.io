async function fetchLatestCVEs() {
    const cveListElement = document.getElementById('cve-list');
    try {
        // Fetch data from NVD API, limit results to the latest 10 CVEs
        const response = await fetch('https://services.nvd.nist.gov/rest/json/cves/1.0/?resultsPerPage=10');
        const data = await response.json();

        // Check if we have CVE items
        if (data.result && data.result.CVE_Items) {
            const cves = data.result.CVE_Items;
            let cveDisplay = '';

            // Loop through each CVE and format it
            cves.forEach(cve => {
                const id = cve.cve.CVE_data_meta.ID;
                const description = cve.cve.description.description_data[0].value;
                const publishedDate = cve.publishedDate;

                cveDisplay += `CVE ID: ${id}\nPublished: ${publishedDate}\nDescription: ${description}\n\n`;
            });

            // Update the <pre> element with formatted CVE data
            cveListElement.textContent = cveDisplay;
        } else {
            cveListElement.textContent = 'No CVE data available.';
        }
    } catch (error) {
        console.error('Error fetching CVE data:', error);
        cveListElement.textContent = 'Failed to load CVE data.';
    }
}

// Call the function to fetch and display CVEs on page load
fetchLatestCVEs();