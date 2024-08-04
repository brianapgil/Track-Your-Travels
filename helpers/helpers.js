// Helper function for handlebars
module.exports = {
    format_date: (date) => {
      if (date instanceof Date) {
        return date.toLocaleDateString();
      }
      return '';
    },
  };
  