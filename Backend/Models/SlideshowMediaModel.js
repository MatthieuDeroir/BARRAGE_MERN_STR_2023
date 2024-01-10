const Slideshow = require('./SlideshowModel');
const Media = require('./MediaModel');
const SlideshowStatus = require('./SlideshowStatusModel');

Slideshow.hasMany(Media, { as: 'media' });
Media.belongsTo(Slideshow, { as: 'slideshow' });

// Add this association
Slideshow.hasOne(SlideshowStatus, { foreignKey: 'slideshowId' });
SlideshowStatus.belongsTo(Slideshow, { foreignKey: 'slideshowId' });