import BengalVendor from '../model/rajasthanSchema.js'

// INSERT MULTIPLE VENDORS
export const insertVendors = async (req, res) => {
  try {
    const vendors = req.body;

    const formattedVendors = vendors.map(vendor => ({
      name: vendor.name,
      location: {
        type: "Point",
        coordinates: [
          parseFloat(vendor.longitude), // longitude
          parseFloat(vendor.latitude),  // latitude
        ],
      },
      city: vendor.city || vendor.City,
      state: vendor.state || vendor.State,
      foodItems: vendor.foodItems
        ? Array.isArray(vendor.foodItems)
          ? vendor.foodItems
          : vendor.foodItems.split(',').map(item => item.trim())
        : [],
      hygieneRating: vendor.hygiene || vendor.hygieneRating,
      tasteRating: vendor.taste || vendor.tasteRating,
      hospitalityRating: vendor.hospitality || vendor.hospitalityRating,
      photoUrl: vendor.photoUrl,
    }));

    const inserted = await BengalVendor.insertMany(formattedVendors);

    res.status(201).json({
      success: true,
      message: 'Vendors inserted successfully',
      data: inserted,
    });
  } catch (error) {
    console.error('Insertion failed:', error.message);
    res.status(500).json({
      success: false,
      message: 'Insertion failed',
      error: error.message,
    });
  }
};

