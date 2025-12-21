import Setting from "../model/Setting.js";

// CREATE

export const createSetting = async (req , res) => {
  try{
    const setting = await Setting.create(req.body);
    res.status(201).json({
      success: true,
      setting,
    });   
  } catch(err){
    console.log(err)
    console.error("Error creating in settings:", err);
    res.status(500).json({success: false, message: "Failed to Create setting"});
  }
};

// GET

export const getSetting = async (req , res) => {
  try {
    const setting = await Setting.find();
    res.status(201).json({
      success: true,
      setting,
    });
  } catch(err) {
    console.log(err)
    console.error("Error get in Setting:", err);
    res.status(500).json({success: false, message: "failed to get setting"})
  }
};

// DELETE
export const deleteSetting = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSetting = await Setting.findByIdAndDelete(id);

    if (!deletedSetting) {
      return res.status(404).json({ success: false, message: "Contact not found" });
    }

    res.status(200).json({ success: true, message: "Contact deleted", setting: deletedSetting });
  } catch (err) {
    console.error("Error deleting contact:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
