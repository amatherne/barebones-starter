// utils/importIcon.js

const importIcon = async (iconName) => {
  try {
    const icon = await import(`../app/components/icons/uploads/${iconName}.tsx`);
    return icon.default;
  } catch (error) {
    console.error(`Error importing icon: ${iconName}`, error);
    return null;
  }
};

export default importIcon;
