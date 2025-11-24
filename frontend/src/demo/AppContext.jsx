import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  axios.defaults.withCredentials = true;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(false);
  const [templatesByCurrentUser, setTemplatesByCurrentUser] = useState([]);
  const [templateById, setTemplateById] = useState("");
  const [otherUsers, setOtherUsers] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [requestsByOthers, setRequestsByOthers] = useState([]);
  const [publicTemplates, setPublicTemplates] = useState([]);
  const [requestById, setRequestById] = useState("");
  const [requests, setRequests] = useState([]);
  const [recentTemplates, setRecentTemplates] = useState([]);

  const [signature, setSignature] = useState(
    localStorage.getItem("savedSignature") ? localStorage.getItem("savedSignature") : null
  );

  const getUserData = useCallback(async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/auth/user-data");
      data.success ? setUserData(data.userData) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  }, [backendUrl]);

  const getAuthState = useCallback(async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/auth/is-auth");
      if (data.success) {
        setIsLoggedIn(true);
        getUserData();
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [backendUrl, getUserData]);

  const getTemplatesByCurrentUser = useCallback(async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/auth/templates");
      if (data.success) {
        setTemplatesByCurrentUser(data.templates);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [backendUrl]);

  const getTemplateById = useCallback(
    async (templateId) => {
      try {
        const { data } = await axios.get(backendUrl + `/api/auth/templates/${templateId}`);
        if (data.success) {
          setTemplateById(data.template);
          // updateLastOpendTime(data.template._id);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
    [backendUrl]
  );

  const getOtherUsersList = useCallback(async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/auth/users");
      if (data.success) {
        setOtherUsers(data.users);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [backendUrl]);

  const getMyRequests = useCallback(async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/auth/my-requests");
      if (data.success) {
        setMyRequests(data.requests);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [backendUrl]);

  const getRequestsByOthers = useCallback(async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/auth/requests-by-others");
      if (data.success) {
        setRequestsByOthers(data.requests);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [backendUrl]);

  const getPublicTemplates = useCallback(async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/auth/public-templates");
      if (data.success) {
        setPublicTemplates(data.templates);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [backendUrl]);

  const getRequestById = useCallback(
    async (requestId) => {
      try {
        const { data } = await axios.get(backendUrl + `/api/auth/requests/${requestId}`);
        if (data.success) {
          setRequestById(data.request);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
    [backendUrl]
  );

  const getRequests = useCallback(async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/auth/requests");
      if (data.success) {
        setRequests(data.requests);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [backendUrl]);

  const getRecentTemplatesByCurrentUser = useCallback(async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/auth/recent-templates");
      if (data.success) {
        setRecentTemplates(data.recentTemplates);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [backendUrl]);

  useEffect(() => {
    getAuthState();
  }, [getAuthState]);

  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
    templatesByCurrentUser,
    getTemplatesByCurrentUser,
    templateById,
    getTemplateById,
    otherUsers,
    getOtherUsersList,
    myRequests,
    getMyRequests,
    requestsByOthers,
    getRequestsByOthers,
    publicTemplates,
    getPublicTemplates,
    signature,
    setSignature,
    requestById,
    getRequestById,
    requests,
    getRequests,
    recentTemplates,
    getRecentTemplatesByCurrentUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
