import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Choice from '../Screens/choice';
import TopBar from '../Screens/TopBar';
import RegisterScreen from '../Screens/register';
import login from '../Screens/login';


import resumeChecker from '../Screens/resumeChecker';

import post from '../Screens/post';
import profile from '../Screens/profile';
import skills from '../Screens/skills';

import education from '../Screens/education';

import viewEducation from '../Screens/viewEducation';
import AllPost from '../Screens/AllPost';
import MyPost from '../Screens/MyPost';

import contacts from '../Screens/contacts';
import chat from '../Screens/chat';

import search from '../Screens/search';
import cpost from '../Screens/cpost';

import resources from '../Screens/resources';

import displayLink from '../Screens/displayLink';
import jobsChoice from '../Screens/jobsChoice';
import jobs from '../Screens/jobs';
import jobsAdvanced from '../Screens/jobsAdvanced';
import resume from '../Screens/resume';

import r_details from '../Screens/resume/details';
import r_education from '../Screens/resume/education';
import r_other from '../Screens/resume/other';
import r_project from '../Screens/resume/project';
import r_skills from '../Screens/resume/skills';
import r_view from '../Screens/resume/view';






const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator>
                <Stack.Screen name="login" component={login} options={{ headerShown: false }} />

        
            <Stack.Screen name="resume" component={resume} options={{ headerShown: false }} />

            <Stack.Screen name="r_details" component={r_details} options={{ headerShown: false }} />
            <Stack.Screen name="r_education" component={r_education} options={{ headerShown: false }} />
            <Stack.Screen name="r_other" component={r_other} options={{ headerShown: false }} />
            <Stack.Screen name="r_project" component={r_project} options={{ headerShown: false }} />
            <Stack.Screen name="r_skills" component={r_skills} options={{ headerShown: false }} />
            <Stack.Screen name="r_view" component={r_view} options={{ headerShown: false }} />




            <Stack.Screen name="jobsChoice" component={jobsChoice} options={{ headerShown: false }} />

        <Stack.Screen name="jobs" component={jobs} options={{ headerShown: false }} />

        <Stack.Screen name="jobsAdvanced" component={jobsAdvanced} options={{ headerShown: false }} />


    <Stack.Screen name="resources" component={resources} options={{ headerShown: false }} />
    <Stack.Screen name="displayLink" component={displayLink} options={{ headerShown: false }} />



<Stack.Screen name="MyPost" component={MyPost} options={{ headerShown: false }} />

    <Stack.Screen name="profile" component={profile} options={{ headerShown: false }} />
    <Stack.Screen name="search" component={search} options={{ headerShown: false }} />
    <Stack.Screen name="AllPost" component={AllPost} options={{ headerShown: false }} />
    <Stack.Screen name="contacts" component={contacts} options={{ headerShown: false }} />
    <Stack.Screen name="chat" component={chat} options={{ headerShown: false }} />
    <Stack.Screen name="viewEducation" component={viewEducation} options={{ headerShown: false }} />
    <Stack.Screen name="education" component={education} options={{ headerShown: false }} />
    <Stack.Screen name="skills" component={skills} options={{ headerShown: false }} />
    <Stack.Screen name="register" component={RegisterScreen} options={{ headerShown: false }} />
    <Stack.Screen name="post" component={post} options={{ headerShown: false }} />
    <Stack.Screen name="choice" component={Choice} options={{ headerShown: false }} />
    <Stack.Screen name="TopBar" component={TopBar} options={{ headerShown: false }} />
    <Stack.Screen name="resumeChecker" component={resumeChecker} options={{ headerShown: false }} />
    <Stack.Screen name="cpost" component={cpost} options={{ headerShown: false }} />

    </Stack.Navigator>
  );
};

export default Navigation;
