// Download buttons point at the latest GitHub release of this site's repository.
// The deploy script writes the repository name here; on <owner>.github.io/<repo>/ it is also worked out from the address.
(function () {
  var repo = 'DrHamdyMahdy/eha-rouster-maker';
  if (repo.indexOf('__') === 0) {
    var owner = location.hostname.split('.')[0];
    var name = location.pathname.split('/').filter(Boolean)[0] || (owner + '.github.io');
    repo = owner + '/' + name;
  }
  document.querySelectorAll('[data-asset]').forEach(function (a) {
    a.href = 'https://github.com/' + repo + '/releases/latest/download/' + a.getAttribute('data-asset');
  });
})();
