"use client";

import { API_URL } from "@/app/layout";
import React, { useEffect, useState } from "react";
import styles from "@/styles/courses/page.module.css";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "@/components/Card";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState("");

  const GetAllCourses = async () => {
    setLoading(true);
    await fetch(
      `${API_URL}/course?title=${searchQuery}&level=${level}&price=${price}`
    )
      .then((res) => res.json())
      .then((result) => setCourses(result.data));
    setLoading(false);
  };

  const ClearFilters = () => {
    setSearchQuery("");
    setLevel("");
    setPrice("");
  };

  useEffect(() => {
    try {
      GetAllCourses();
    } catch (err) {
      console.log("Failed To Retrive Courses.");
    }
  }, [searchQuery, level, price]);

  return (
    <>
      <section className="container">
        <div className={styles.searchSection}>
          <input
            value={searchQuery}
            onChange={(e) => {
              ClearFilters();
              setSearchQuery(e.target.value);
            }}
            type="text"
            placeholder="Enter Your Search Here..."
          />
          <FontAwesomeIcon icon={fas.faMagnifyingGlass} />
        </div>
      </section>

      <section className="container">
        <div className={styles.filtersSection}>
          <select
            value={price}
            onChange={(e) => {
              ClearFilters();
              setPrice(e.target.value);
            }}
            name="Price Filter"
          >
            <option value="">Price Filter</option>
            <option value="20">Less Than 20$</option>
            <option value="50">Less Than 50$</option>
            <option value="100">Less Than 100$</option>
            <option value="1000">Less Than 1000$</option>
          </select>

          <select
            value={level}
            onChange={(e) => {
              ClearFilters();
              setLevel(e.target.value);
            }}
            name="Level Filter"
          >
            <option value="">Level Filter</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </section>

      <section className="container">
        <div className={styles.coursesSection}>
          {loading ? (
            <h1 style={{ color: "white" }}>Loading...</h1>
          ) : (
            <>
              {courses ? (
                courses.map((course) => {
                  return <Card key={course.id} course={course} />;
                })
              ) : (
                <h1 style={{ color: "white" }}>No Courses Found</h1>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
