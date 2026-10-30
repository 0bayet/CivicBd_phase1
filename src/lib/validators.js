export const LIMITS = {
  title: 90,
  description: 1000,
  location: 120,
  notes: 400,
};

export const IMAGE_RULES = {
  types: ["image/jpeg", "image/png", "image/webp"],
  maxBytes: 5 * 1024 * 1024,
};

// Rough bounding box of Bangladesh.
const BOUNDS = { lat: [20.5, 26.8], lng: [88.0, 92.8] };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateImage(file) {
  if (!file) return "";
  if (!IMAGE_RULES.types.includes(file.type)) {
    return "Choose a JPG, PNG or WebP image.";
  }
  if (file.size > IMAGE_RULES.maxBytes) {
    return "This image is larger than 5 MB. Choose a smaller file.";
  }
  return "";
}

function validateCoordinate(raw, [min, max], name) {
  const value = Number(raw);
  if (Number.isNaN(value)) return `${name} must be a number, for example 23.7461.`;
  if (value < min || value > max) return `${name} must be between ${min} and ${max} to fall inside Bangladesh.`;
  return "";
}

export function validateReport(values, file) {
  const errors = {};
  const title = values.title.trim();
  const description = values.description.trim();
  const location = values.location.trim();

  if (!title) errors.title = "Enter a title for the issue.";
  else if (title.length < 8) errors.title = "Make the title a little more specific (at least 8 characters).";
  else if (title.length > LIMITS.title) errors.title = `Keep the title under ${LIMITS.title} characters.`;

  if (!values.category) errors.category = "Choose the category that fits best.";

  if (!description) errors.description = "Describe what you found.";
  else if (description.length < 20) errors.description = "Add a little more detail (at least 20 characters).";
  else if (description.length > LIMITS.description) errors.description = `Keep the description under ${LIMITS.description} characters.`;

  if (!location) errors.location = "Describe where the problem is.";
  else if (location.length < 5) errors.location = "Add a street, area or landmark so others can find it.";
  else if (location.length > LIMITS.location) errors.location = `Keep the location under ${LIMITS.location} characters.`;

  const lat = values.latitude.trim();
  const lng = values.longitude.trim();
  if (lat || lng) {
    if (!lat) errors.latitude = "Enter both coordinates or leave both empty.";
    else errors.latitude = validateCoordinate(lat, BOUNDS.lat, "Latitude");
    if (!lng) errors.longitude = "Enter both coordinates or leave both empty.";
    else errors.longitude = validateCoordinate(lng, BOUNDS.lng, "Longitude");
    if (!errors.latitude) delete errors.latitude;
    if (!errors.longitude) delete errors.longitude;
  }

  if (values.notes.trim().length > LIMITS.notes) errors.notes = `Keep the notes under ${LIMITS.notes} characters.`;

  const imageError = validateImage(file);
  if (imageError) errors.photo = imageError;

  return errors;
}

export function checkPassword(password) {
  return {
    length: password.length >= 8,
    letter: /[A-Za-z]/.test(password),
    number: /\d/.test(password),
  };
}

export function validateLogin(values) {
  const errors = {};
  if (!values.email.trim()) errors.email = "Enter your email address.";
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = "Enter a valid email address, such as name@example.com.";
  if (!values.password) errors.password = "Enter your password.";
  return errors;
}

export function validateRegister(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Enter your full name.";
  else if (values.name.trim().length < 2) errors.name = "Your name must be at least 2 characters.";

  if (!values.email.trim()) errors.email = "Enter your email address.";
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = "Enter a valid email address, such as name@example.com.";

  const checks = checkPassword(values.password);
  if (!values.password) errors.password = "Create a password.";
  else if (!checks.length || !checks.letter || !checks.number) {
    errors.password = "Use at least 8 characters with a letter and a number.";
  }

  if (!values.confirmPassword) errors.confirmPassword = "Re-enter your password.";
  else if (values.confirmPassword !== values.password) errors.confirmPassword = "The passwords do not match.";

  if (!values.agree) errors.agree = "Accept the privacy policy to continue.";
  return errors;
}
