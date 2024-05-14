import React from 'react';
import SideBar from '../../component/SideBar/SideBar';
import TopBar from '../../component/SideBar/TopBar';
import TeamList from './TeamList';
import '../Dashboard/Dashboard.scss';

export default function Team() {
    return (
        <div className="dashboard">
            <SideBar email="email"/>
            <div className="dashboard_container">
                <TopBar email="email"/>
                <TeamList />
            </div>
        </div>
    );
}
