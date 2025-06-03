'use server';
import prisma from "@/lib/prisma";
import { cache } from "react";

export const getCourses = cache(async () => {
    const courses = await prisma.course.findMany();
    return courses;
});

export const getUserCourses = cache(async (userId: string) => {
    const courses = await prisma.course.findMany({
        where: {
            userId: userId
        }
    });
    return courses;
});

// TODO: Remove this function
export const saveCourses = async () => {
    await prisma.course.createMany({
        data: [
            {
              "title": "Garden from Scratch",
              "subtitle": "Fundamentals of Home Garden Design",
              "description": "Learn how to design your own garden step by step – from analyzing your space to understanding garden styles and the basics of composition.",
              "image": "course1.png",
              "price": 90,
              "modules": [
                "Assessing Your Space and Site Analysis",
                "Understanding Garden Styles and Themes",
                "Basic Principles of Garden Composition",
                "Creating a Practical and Functional Garden Layout"
              ]
            },
            {
              "title": "Plant Compositions",
              "subtitle": "How to Choose the Right Plants for Your Garden",
              "description": "Discover proven methods for selecting plants that thrive in your conditions and create stunning, seasonal garden arrangements.",
              "image": "course2.png",
              "price": 85,
              "modules": [
                "Understanding Plant Needs and Garden Conditions",
                "Seasonal Planting and Succession Planning",
                "Combining Plants for Aesthetic Appeal",
                "Choosing Native and Low-Maintenance Plants"
              ]
            },
            {
              "title": "Garden on Screen",
              "subtitle": "Digital Garden Design Tools and Techniques",
              "description": "Master the art of creating clear garden plans and visualizations using simple, free apps – no graphic design experience needed.",
              "image": "course3.png",
              "price": 70,
              "modules": [
                "Introduction to Digital Garden Planning Tools",
                "Creating Your First Digital Garden Plan",
                "Visualizing Plant Compositions Digitally",
                "Presenting and Sharing Your Garden Design"
              ]
            }
          ]
          
    })
}