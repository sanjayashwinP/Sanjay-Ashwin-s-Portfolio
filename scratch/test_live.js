async function testLive() {
  const backend = 'https://sanjay-ashwins-portfolio.onrender.com';
  const frontend = 'https://sanjayashwinp-portfolio.vercel.app';

  console.log('--- 1. Testing GET /api/health ---');
  try {
    const hRes = await fetch(`${backend}/api/health`);
    console.log('Health status:', hRes.status);
    const hData = await hRes.text();
    console.log('Health body:', hData);
  } catch (err) {
    console.error('Health error:', err.message);
  }

  console.log('\n--- 2. Testing GET /api/profile ---');
  try {
    const pRes = await fetch(`${backend}/api/profile`);
    console.log('Profile status:', pRes.status);
    const pData = await pRes.text();
    console.log('Profile body:', pData.substring(0, 100));
  } catch (err) {
    console.error('Profile error:', err.message);
  }

  console.log('\n--- 3. Testing OPTIONS /api/auth/login with Origin ---');
  try {
    const optRes = await fetch(`${backend}/api/auth/login`, {
      method: 'OPTIONS',
      headers: {
        'Origin': frontend,
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'content-type'
      }
    });
    console.log('OPTIONS status:', optRes.status);
    console.log('OPTIONS headers:');
    for (const [k, v] of optRes.headers.entries()) {
      if (k.startsWith('access-control') || k === 'content-type') {
        console.log(`  ${k}: ${v}`);
      }
    }
  } catch (err) {
    console.error('OPTIONS error:', err.message);
  }

  console.log('\n--- 4. Testing POST /api/auth/login with credentials ---');
  try {
    const loginRes = await fetch(`${backend}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': frontend
      },
      body: JSON.stringify({
        username: 'sanjay_admin',
        password: 'Sanjay@SecureAdmin2026!'
      })
    });
    console.log('POST login status:', loginRes.status);
    const loginText = await loginRes.text();
    console.log('POST login response:', loginText);
  } catch (err) {
    console.error('POST login error:', err.message);
  }
}
testLive();
