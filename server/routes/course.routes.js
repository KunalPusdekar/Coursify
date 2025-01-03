import {Router} from 'express';

import { getAllCourses,addLecturesToCourseById,getLecturesByCourseId,createCourse,updateCourse,removeCourse, removeLectureFromCourse } from '../controllers/course.controller.js';
import { authorizedRoles, isLoggedIn ,authorizeSubscriber} from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';

const router =Router();


router.route('/')
.get(getAllCourses)
.post(
    isLoggedIn,   //login is mandatory because no one can create course util and unless they are not login as ADMIN
    authorizedRoles('ADMIN'), //This  auth.middleware.js use for checking the role of user if role = ADMIN then only remove,update,create course operation will perform 
    upload.single('thumbnail'),
    createCourse
    )
.delete(
    isLoggedIn,
    authorizedRoles('ADMIN'),
    removeLectureFromCourse
    )


router.route('/:id')
.get(isLoggedIn,authorizeSubscriber, getLecturesByCourseId)
.put(
    isLoggedIn,  //MANDTORY
    authorizedRoles('ADMIN'), //This  auth.middleware.js use for checking the role of user if role = ADMIN then only remove,update,create course operation will perform 
    updateCourse)
.delete(
    isLoggedIn,  //MANTARY
    authorizedRoles('ADMIN'), //This  auth.middleware.js use for checking the role of user if role = ADMIN then only remove,update,create course operation will perform 
    removeCourse)
.post(
    isLoggedIn,
    authorizedRoles('ADMIN'),
    upload.single('lecture'),
    addLecturesToCourseById
)    


export default router;