import React, { useState, useEffect } from 'react';
import { BryntumGantt } from '@bryntum/gantt-react';
import './App.scss';

const apiBaseUrl = 'http:/localhost:8181/';
function App() {

    const [loading, setLoading] = useState(true);
    const [calendars, setCalendars] = useState([]);
    const [resources, setResources] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [dependencies, setDependencies] = useState([]);
    const [resourceAssignments, setResourceAssignments] = useState([]);

    const fetchCalendarData = () => {
        return [];
      };

    const fetchResourceData = () => {
      return fetch(new URL('resources', apiBaseUrl))
        .then(response => response.json())
    };
  
    const fetchTaskData = () => {
      return fetch(new URL('tasks', apiBaseUrl))
        .then(response => response.json())
    };
  
    const fetchDependencyData = () => {
      return fetch(new URL('dependencies', apiBaseUrl))
        .then(response => response.json())
    };
  
    const fetchResourceAssignmentData = () => {
      return fetch(new URL('resourceAssignments', apiBaseUrl))
        .then(response => response.json())
    };
  
    useEffect(() => {
      Promise.all([
        fetchCalendarData(),
        fetchResourceData(),
        fetchTaskData(),
        fetchDependencyData(),
        fetchResourceAssignmentData()
      ]).then(([calendarData, resourcesData, tasksData, dependenciesData, resourceAssignmentsData]) => {
        setCalendars(calendarData);
        setResources(resourcesData);
        setTasks(tasksData);
        setDependencies(dependenciesData);
        setResourceAssignments(resourceAssignmentsData);
        
        setLoading(false);
        console.log('data loaded');
      });
    }, []);
   
    if (loading) {
      return <div>Loading...</div>;
    } else {
      return (
        <BryntumGantt
            calendars =  {calendars}
            tasks = {tasks}
            assignments = {resourceAssignments}
            dependencies = {dependencies}
            resources = {resources}
            startDate={"2019-02-17"}
        />
      );
    }
}

export default App;