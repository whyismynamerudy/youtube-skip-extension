const SUPABASE_URL = 'YOUR_SUPABASE_PROJECT_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded', function() {
  const signInButton = document.getElementById('signInButton');
  const signOutButton = document.getElementById('signOutButton');
  const userInfo = document.getElementById('userInfo');
  const userEmail = document.getElementById('userEmail');
  const reactionTimes = document.getElementById('reactionTimes');
  const reactionTimesList = document.getElementById('reactionTimesList');

  signInButton.addEventListener('click', signIn);
  signOutButton.addEventListener('click', signOut);

  checkUser();

  async function signIn() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: chrome.identity.getRedirectURL()
        }
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error signing in:', error.message);
    }
  }

  async function signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      updateUI(null);
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  }

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();
    updateUI(user);
    if (user) {
      loadReactionTimes(user.id);
      chrome.storage.sync.set({ userId: user.id });
    }
  }

  function updateUI(user) {
    if (user) {
      signInButton.style.display = 'none';
      userInfo.style.display = 'block';
      reactionTimes.style.display = 'block';
      userEmail.textContent = user.email;
    } else {
      signInButton.style.display = 'block';
      userInfo.style.display = 'none';
      reactionTimes.style.display = 'none';
      chrome.storage.sync.remove('userId');
    }
  }

  async function loadReactionTimes(userId) {
    try {
      const { data, error } = await supabase
        .from('reaction_times')
        .select('time')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;

      reactionTimesList.innerHTML = '';
      data.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.time.toFixed(3)} seconds`;
        reactionTimesList.appendChild(li);
      });
    } catch (error) {
      console.error('Error loading reaction times:', error.message);
    }
  }
});