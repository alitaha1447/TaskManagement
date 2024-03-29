const { apiRequest } = require(".");

export const CreateProject = async (project) => apiRequest("post", "/api/projects/create-project", project);

export const GetAllProjects = async (project) => apiRequest("post", "/api/projects/get-all-projects", project);

export const GetProjectById = async (id) => apiRequest("post", "/api/projects/get-project-by-id", { _id: id });

export const EditProject = async (project) => apiRequest("post", "/api/projects/edit-project", project);

export const DeleteProject = async (id) => apiRequest("post", "/api/projects/delete-project", { _id: id });

export const GetProjectsByRole = async (userId) => apiRequest("post", "/api/projects/get-projects-by-role", { userId });