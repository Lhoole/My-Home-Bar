import React, { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Auth from '../../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../../utils/queries';