import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * Refresh the access token using the refresh token
 */
const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }
    const response = await axios.post(`${API_URL}/auth/refresh`, {
      refresh: refreshToken,
    });
    const newAccessToken = response.data.access;
    localStorage.setItem("token", newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
    throw error;
  }
};

const restaurantService = {
  /**
   * Fetch all addresses for the logged-in user
   */
  getAddresses: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No access token available");
      }
      const response = await axios.get(`${API_URL}/addresses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching addresses:", error);
      throw error;
    }
  },
  /**
   * Create a new address for the logged-in user
   * @param {object} addressData
   */
  createAddress: async (addressData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No access token available");
      }
      const response = await axios.post(
        `${API_URL}/addresses/create`,
        addressData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error creating address:", error);
      throw error;
    }
  },
  /**
   * Fetch all restaurants
   */
  getRestaurants: async () => {
    try {
      const response = await axios.get(`${API_URL}/restaurants`);
      return response.data;
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      throw error;
    }
  },

  /**
   * Fetch specific restaurant details
   * @param {string} restaurantId
   */
  getRestaurantDetails: async (restaurantId) => {
    try {
      const response = await axios.get(
        `${API_URL}/restaurants/${restaurantId}`,
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching details for restaurant ${restaurantId}:`,
        error,
      );
      throw error;
    }
  },

  /**
   * Fetch menu for a specific restaurant
   * @param {string} restaurantId
   */
  getMenu: async (restaurantId) => {
    try {
      const response = await axios.get(
        `${API_URL}/restaurants/${restaurantId}/menu`,
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching menu for restaurant ${restaurantId}:`,
        error,
      );
      throw error;
    }
  },

  /**
   * Create a new order
   * @param {object} orderData
   */
  createOrder: async (orderData) => {
    try {
      let token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No access token available");
      }
      let response = await axios.post(`${API_URL}/orders/create`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 403) {
        // Token expired, try to refresh
        const newToken = await refreshAccessToken();
        // Retry the request with the new token
        const response = await axios.post(
          `${API_URL}/orders/create`,
          orderData,
          {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          },
        );
        return response.data;
      } else {
        console.error("Error creating order:", error);
        throw error;
      }
    }
  },

  /**
   * Get order details
   * @param {string} orderId
   */
  getOrderDetails: async (orderId) => {
    try {
      let token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No access token available");
      }
      let response = await axios.get(`${API_URL}/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 403) {
        // Token expired, try to refresh
        const newToken = await refreshAccessToken();
        // Retry the request with the new token
        const response = await axios.get(`${API_URL}/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
        });
        return response.data;
      } else {
        console.error(`Error fetching details for order ${orderId}:`, error);
        throw error;
      }
    }
  },
  /**
   * Get order history for logged-in user
   * @param {number} page
   * @param {number} limit
   */
  getOrders: async (page = 1, limit = 20) => {
    try {
      let token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No access token available");
      }
      let response = await axios.get(`${API_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 403) {
        const newToken = await refreshAccessToken();
        const response = await axios.get(`${API_URL}/orders`, {
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
          params: { page, limit },
        });
        return response.data;
      } else {
        console.error("Error fetching orders:", error);
        throw error;
      }
    }
  },
  /**
   * Track order status
   * @param {string} orderId
   */
  getOrderTrack: async (orderId) => {
    try {
      let token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No access token available");
      }
      let response = await axios.get(`${API_URL}/orders/${orderId}/track`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 403) {
        const newToken = await refreshAccessToken();
        const response = await axios.get(
          `${API_URL}/orders/${orderId}/track`,
          {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          },
        );
        return response.data;
      } else {
        console.error(`Error tracking order ${orderId}:`, error);
        throw error;
      }
    }
  },
  /**
   * Get restaurant reviews
   * @param {string} restaurantId
   */
  getReviews: async (restaurantId) => {
    try {
      const response = await axios.get(
        `${API_URL}/restaurants/${restaurantId}/reviews`,
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching reviews for restaurant ${restaurantId}:`,
        error,
      );
      throw error;
    }
  },
  /**
   * Create restaurant review
   * @param {string} restaurantId
   * @param {object} payload
   */
  createReview: async (restaurantId, payload) => {
    try {
      let token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No access token available");
      }
      let response = await axios.post(
        `${API_URL}/restaurants/${restaurantId}/reviews/create`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      if (error.response?.status === 403) {
        const newToken = await refreshAccessToken();
        const response = await axios.post(
          `${API_URL}/restaurants/${restaurantId}/reviews/create`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          },
        );
        return response.data;
      } else {
        console.error("Error creating review:", error);
        throw error;
      }
    }
  },
};

export default restaurantService;
