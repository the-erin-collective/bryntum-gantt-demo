const axios = require('axios');
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const headers = {
    'Content-Type': 'application/json'
  };

const _dataSource_logInserts = true;
const _dataSource_ApiEndpoint = 'http://127.0.0.1:8080/';
const _dataSource_TasksRoute = 'tasks';
const _dataSource_ResourcesRoute = 'resources';
const _dataSource_DependenciesRoute = 'dependencies';
const _dataSource_ResourceAssignmentsRoute = 'resourceAssignments';

const fetchTasks = () => {
    return axios.get(`${_dataSource_ApiEndpoint}${_dataSource_TasksRoute}`, { headers })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  const fetchResources = () => {
    return axios.get(`${_dataSource_ApiEndpoint}${_dataSource_ResourcesRoute}`, { headers })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  const fetchDependencies = () => {
    return axios.get(`${_dataSource_ApiEndpoint}${_dataSource_DependenciesRoute}`, { headers })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  const fetchResourceAssignments = () => {
    return axios.get(`${_dataSource_ApiEndpoint}${_dataSource_ResourceAssignmentsRoute}`, { headers })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
Promise.all([
    fetchTasks(),
    fetchResources(),
    fetchDependencies(),
    fetchResourceAssignments()
]).then(async (results) => {
    const tasks = results[0];
    const resources = results[1];
    const dependencies = results[2];
    const resourceAssignments = results[3];
     
  // Map external Task schema to local Task schema
  const mappedTasks = tasks.map((task) => {
    return {
      id: task.id.toString(),
      parentId: task.parent_id?.toString(),
      name: task.title,
      startDate: task.start,
      endDate: task.end,
      percentDone: task.progress,
      note: task.description
    };
  });

  // Map external Dependency schema to local Dependency schema
  const mappedDependencies = dependencies.map((dependency) => {
    return {
      id: dependency.id.toString(),
      from: dependency.parent_id.toString(),
      to: dependency.dependent_id.toString(),
      active: true,
      type: dependency.type
    };
  });

  // Map external Resource schema to local Resource schema
  const mappedResources = resources.map((resource) => {
    return {
      id: resource.id.toString(),
      name: resource.name
    };
  });

  // Map external ResourceAssignment schema to local ResourceAssignment schema
  const mappedResourceAssignments = resourceAssignments.map((assignment) => {
    return {
      id: assignment.id.toString(),
      event: assignment.task_id.toString(),
      resource: assignment.resource_id.toString()
    };
  });

  // Insert mapped data to the local database
  for (const task of mappedTasks) {
    try {
      const createdTask = await prisma.task.create({data:task});
      if(_dataSource_logInserts){
        console.log('Created task:', createdTask);
      }
    } catch (error) {
      console.log('Error creating task:', error);
    }
  }

  for (const dependency of mappedDependencies) {
    try {
      const createdDependency = await prisma.dependency.create({data:dependency});
      if(_dataSource_logInserts){
        console.log('Created dependency:', createdDependency);
      }
    } catch (error) {
      console.log('Error creating dependency:', error);
    }
  }

  for (const resource of mappedResources) {
    try {
      const createdResource = await prisma.resource.create({data: resource});
      if(_dataSource_logInserts){
        console.log('Created resource:', createdResource);
      }
    } catch (error) {
      console.log('Error creating resource:', error);
    }
  }

  for (const resourceAssignment of mappedResourceAssignments) {
    try {
      const createdResourceAssignment = await prisma.resourceAssignment.create({data:resourceAssignment});
      if(_dataSource_logInserts){
        console.log('Created resource assignment:', createdResourceAssignment);
      }
    } catch (error) {
      console.log('Error creating resource assignment:', error);
    }
  }
})
.catch((error) => {
    console.error(error);
});