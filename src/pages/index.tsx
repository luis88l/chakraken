import {
	Flex,
	Stack,
	Heading,
	Box,
	Button,
	FormControl,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	CircularProgress,
} from "@chakra-ui/react";
import { FiLock, FiUser, FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";
import Router, { useRouter } from "next/router"
import { useState, useEffect } from "react";
import Head from "next/head";
import { userLogin } from "../fixtures/login";
import { KAlert } from "../components/react";
import { NextResponse, NextRequest } from "next/server"

const Index = () => {
	const router = useRouter()

	return null
}

export default Index
