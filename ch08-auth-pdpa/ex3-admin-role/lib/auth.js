// lib/auth.js – route-protection middleware
function requireLogin(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/member/login'); // AuthN failed
  }
  next();
}

// usage: requireRole('admin')
function requireRole(...roles) {
  return (req, res, next) => {
    const user = req.session.user;
    if (!user) return res.redirect('/member/login');
    if (!roles.includes(user.role)) {
      return res.status(403).send('403 Forbidden'); // AuthZ failed
    }
    next();
  };
}

module.exports = { requireLogin, requireRole };
