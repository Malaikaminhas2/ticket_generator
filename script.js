// helpers
const validEmail = v => /^\S+@\S+\.\S+$/.test(v);

// detect page
const onForm = !!document.getElementById('ticketForm');

// ---------- FORM PAGE ----------
if(onForm){
  const form = document.getElementById('ticketForm');
  const photoInput = document.getElementById('avatar');
  const avatarPrevBox = document.getElementById('avatarPreview');
  const avatarImg = document.getElementById('avatarImg');

  const nameInp = document.getElementById('fullname');
  const emailInp = document.getElementById('email');
  const ghInp = document.getElementById('github');

  const errPhoto = document.getElementById('err-photo');
  const errName = document.getElementById('err-name');
  const errEmail = document.getElementById('err-email');
  const errGithub = document.getElementById('err-github');

  let photoDataURL = "";

  // upload preview
  photoInput.addEventListener('change', ()=>{
    const f = photoInput.files[0];
    if(!f) return;
    const okType = /image\/(png|jpeg)/.test(f.type);
    const okSize = f.size <= 500*1024;
    if(!okType || !okSize){
      errPhoto.style.display = 'block';
      photoInput.value = "";
      avatarPrevBox.style.display = 'none';
      return;
    }
    errPhoto.style.display = 'none';
    const reader = new FileReader();
    reader.onload = e => {
      photoDataURL = e.target.result;
      avatarPrevBox.style.display = 'flex';
      avatarImg.src = photoDataURL;
    };
    reader.readAsDataURL(f);
  });

  form.addEventListener('submit', e=>{
    e.preventDefault();
    const name = nameInp.value.trim();
    const email = emailInp.value.trim();
    const gh = ghInp.value.trim();

    let ok = true;
    if(!photoDataURL){ errPhoto.style.display = 'block'; ok = false; } else errPhoto.style.display = 'none';
    if(!name){ errName.style.display = 'block'; ok = false; } else errName.style.display = 'none';
    if(!validEmail(email)){ errEmail.style.display = 'block'; ok = false; } else errEmail.style.display = 'none';
    if(!gh){ errGithub.style.display = 'block'; ok = false; } else errGithub.style.display = 'none';
    if(!ok) return;

    // id
    const id = '#'+Math.floor(100000 + Math.random()*900000);

    // save
    localStorage.setItem('ticketName', name);
    localStorage.setItem('ticketEmail', email);
    localStorage.setItem('ticketGithub', gh);
    localStorage.setItem('ticketAvatar', photoDataURL);
    localStorage.setItem('ticketId', id);

    // go preview
    window.location.href = 'preview.html';
  });
}
