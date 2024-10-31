async function fetchLatestCVEs() {
    const cveListElement = document.getElementById('cve-list');

    // Set the start date to one week ago
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const formattedDate = oneWeekAgo.toISOString().split('T')[0];

    try {
        const response = await fetch(`https://services.nvd.nist.gov/rest/json/cves/2.0?cvssV2Severity=LOW&resultsPerPage=5&pubStartDate=${formattedDate}`, {
            headers: {
                'Accept': 'application/json'
            }
        });

        const responseText = await response.text();
        console.log('Raw response:', responseText);

        if (!response.ok || !response.headers.get('content-type')?.includes('application/json')) {
            throw new Error('Response is not JSON');
        }

        const data = JSON.parse(responseText);

        if (data.vulnerabilities && data.vulnerabilities.length > 0) {
            let cveDisplay = '';

            data.vulnerabilities.forEach(cve => {
                const id = cve.cve.id;
                const description = cve.cve.descriptions[0]?.value || 'No description available';
                const publishedDate = cve.published;

                cveDisplay += `CVE ID: ${id}\nPublished: ${publishedDate}\nDescription: ${description}\n\n`;
            });

            cveListElement.textContent = cveDisplay;
        } else {
            cveListElement.textContent = 'No recent CVE data available.';
        }
    } catch (error) {
        console.error('Error fetching CVE data:', error);
        cveListElement.textContent = 'Failed to load CVE data.';
    }
}

fetchLatestCVEs();