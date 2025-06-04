import axios from "axios"
import { captainModel } from "../Models/captain.model.js";

export const getAddressCoordinates = async (address) => {
  const apiKey = process.env.GOOGLE_MAPS_API

  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: address,
        key: apiKey,
      },
    });

    const data = response.data;

    if (data.status !== 'OK') {
      throw new Error(`Geocoding failed: ${data.status} - ${data.error_message || 'No error message'}`);
    }

    const location = data.results[0].geometry.location;

    return {
      ltd: location.lat,
      lng: location.lng,
    };
  } catch (error) {
    console.error('Error getting coordinates:', error.message);
    throw error;
  }
}

export const getDistanceAndTime = async (current, destination) => {
  if (!current || !destination) {
    throw new Error('Origin and destination are required');
  }
  const apiKey = process.env.GOOGLE_MAPS_API
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(current)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

  try {
    const response = await axios.get(url)
    if (response.data.status === 'OK') {

      if (response.data.rows[0].elements[0].status === 'ZERO_RESULTS') {
        throw new Error('No routes found');
      }

      return response.data.rows[0].elements[0];
    } else {
      throw new Error('Unable to fetch distance and time');
    }

  } catch (error) {
    console.error("Error getting distance and time", error)
    throw error
  }
}

export const getAutoCompleteSuggestions = async (input) => {
  if (!input) {
    throw new Error("Input address is required")
  }
  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';

  try {

    const response = await axios.get(url, {
      params: {
        input,
        key: apiKey
      }
    })
    if (response.data.status !== 'OK') {
      throw new Error(response.data.error_message || 'Failed to fetch autocomplete suggestions');
    }

    return response.data.predictions.map((p) => p.description);

  } catch (error) {
    console.error("Error getting suggestions", error)
    throw error
  }
}

export const getCaptainInTheRadius = async (ltd,lng,radius) => {
  try {
      const captains = captainModel.find({
        location:{ $geoWithin:{
          $centerSphere:[[ltd,lng],radius/6371]
        }}
      })
      return captains
  } catch (error) {
    res.status(500).json({status:500,message:"Error getting captains in the radius"})
  }
}