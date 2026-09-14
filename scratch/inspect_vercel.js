async function inspectVercel() {
  const vHtml = await (await fetch('https://sanjayashwinp-portfolio.vercel.app/')).text();
  const jsMatch = vHtml.match(/src="(\/assets\/[^"]+\.js)"/);
  console.log('JS bundle match:', jsMatch ? jsMatch[1] : 'none');

  if (jsMatch) {
    const jsUrl = 'https://sanjayashwinp-portfolio.vercel.app' + jsMatch[1];
    console.log('Fetching:', jsUrl);
    const jsContent = await (await fetch(jsUrl)).text();

    const renderMatches = jsContent.match(/https:\/\/[^"'\s)]*onrender\.com[^"'\s)]*/g);
    const localhostMatches = jsContent.match(/http:\/\/localhost:[0-9]+[^"'\s)]*/g);
    console.log('Render URL in bundle:', renderMatches);
    console.log('Localhost URL in bundle:', localhostMatches);

    // Look for BASE_URL or fetch calls
    const authIndex = jsContent.indexOf('/auth/login');
    if (authIndex !== -1) {
      console.log('Context around /auth/login:');
      console.log(jsContent.substring(Math.max(0, authIndex - 150), authIndex + 100));
    }
  }
}
inspectVercel();
