"use client";

import { useState } from "react";
import ActivityTable from "@/components/ActivityTable";
import Card from "@/components/Card";
import LineChart from "@/components/MyChart";
import Navbar from "@/components/Navbar";
import NumberedListTable from "@/components/ServiceTable";
import BarChart from "@/components/MyChart";

import MyChart from "@/components/MyChart";



export default function Dashboard() {


  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="w-full px-4 lg:pl-80">
      <div className="h-full">
          <div className="flex items-center w-full h-16 topBar">
            <h1 className="font-bold uppercase">Welcome Back, John</h1>
          </div>
          <section className="grid grid-cols-1 gap-4 mainSection">
            <section className="topSection">
              <div className="flex flex-col">
                <h3 className="font-medium uppercase">Overview</h3>
                <div className="grid gap-4 md:grid-cols-4 sm:grid-cols-2 cardsContainer">
                  <Card label="Number of cows" details="23" />
                  <Card label="Number of crops" details="2,334" />
                  <Card label="Store Capacity" details="10/100" />
                  <Card label="Storage Capacity" details="12/50" />
                </div>
              </div>
            </section>
            <section className="grid grid-cols-1 md:grid-cols-2 bottomSection">
              <div className="w-full p-4 chartDiv">
                <h1 className="font-medium uppercase">Produce over time</h1>

                  {/* Replace with your chart component */}
                  <MyChart />

              </div>
              <div className="w-full p-4 detailsContainer">
                <div className="services">
                  <h1 className="font-medium uppercase">Services Requested</h1>
                  <div className="mt-4">
                    <NumberedListTable service="Ploughing" provider="Makiss Ltd" date="18-12-2023" />
                  </div>
                </div>
                <div className="w-full p-4 farmActivities">
                  <h1 className="font-medium uppercase">Upcoming Farm Activities</h1>
                  <div className="mt-4">
                    <ActivityTable activity="Weeding" date="12-05-2023" />
                  </div>
                </div>
              </div>
            </section>
          </section>
        </div>
      </div>
    </div>
  );
}
