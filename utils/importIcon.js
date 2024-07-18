// utils/importIcon.js

const importIcon = async (iconName) => {
  try {
    // Adjust the path to your actual icon directory
    const { default: IconComponent } = await import(`../app/components/icons/uploads/${iconName}`);
    return IconComponent;
  } catch (error) {
    console.error(`Error loading icon ${iconName}:`, error);
    return null;
  }
};

export default importIcon;
