import {
	Award,
	CircleDollarSign,
	FacebookIcon,
	InstagramIcon,
	Laptop,
	LinkedinIcon,
	Mail,
	MapPin,
	Phone,
	UserCheck,
} from "lucide-react";

export const navItems = [
	{
		slug: "/",
		label: "Home",
	},
	// {
	// 	slug: "/about",
	// 	label: "About",
	// },
	{
		slug: "/courses",
		label: "Courses",
	},
	{
		slug: "/contact",
		label: "Contact",
	},
];

export const wasfsCredibility = [
	"100% Online Learning | Flexible Schedules | Expert Instructors.",
	"Accredited by the International Institute of Certified Forensic Investigation Professionals (IICFIP), USA.",
	"Partnered with Precious Cornerstone University for professional training.",
];

export const SHOWCASE_VIDEO =
	"https://res.cloudinary.com/dh0rc6p1c/video/upload/v1748359117/wasfs/854322-hd_1280_720_25fps_du1u8z.mp4";

export const DEFAULT_PROFILE_PICTURE =
	"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";

export const subjects = [
	"Admissions",
	"General Inquiry",
	"Technical Support",
	"Other",
];

export const socialLinks = [
	{
		name: "Facebook",
		icon: FacebookIcon,
		slug: "https://facebook.com",
	},
	{
		name: "Instagram",
		icon: InstagramIcon,
		slug: "https://instagram.com",
	},
	{
		name: "Linkedin",
		icon: LinkedinIcon,
		slug: "https://linkedin.com",
	},
];

export const contactDetails = [
	{
		icon: Mail,
		name: "Email us",
		slug: "mailto:support@wasfs.com",
		text: "support@wasfs.com",
	},
	{
		icon: Phone,
		name: "Call us",
		slug: "tel:09022882288",
		text: "(+234) 802 3536 722",
	},
	{
		icon: MapPin,
		name: "Our location",
		slug: "#",
		text: "51B, Agboola Ajumobi, Magodo GRA Phase 2, Ikeja, Lagos Nigeria",
	},
];

export const footerDetails = [
	{
		title: "Quick links",
		links: [
			{
				slug: "/",
				label: "Home",
			},
			{
				slug: "/courses",
				label: "Our courses",
			},
			{
				slug: "/contact",
				label: "Contact",
			},
		],
	},
	{
		title: "Legal",
		links: [
			{
				slug: "/terms-of-use",
				label: "Terms of Use",
			},
			{
				slug: "/privacy-policy",
				label: "Privacy Policy",
			},
			{
				slug: "/cancellation-policy",
				label: "Cancellation Policy",
			},
		],
	},
];

export const faqs = [
	{
		question:
			"What is the West African School of Forensic Studies (WASFS)?",
		answer: " WASFS is a leading institution that provides professional forensic training in fraud auditing, digital forensics, and criminal investigations. We offer online, globally recognized certifications for professionals and students.",
	},
	{
		question: "Are WASFS certifications recognized internationally?",
		answer: "Yes, WASFS is accredited by the International Institute of Certified Forensic Investigation Professionals (IICFIP), USA, ensuring our certifications are globally accepted.",
	},
	{
		question: "How do I apply for a program?",
		answer: "You can apply online by visiting our Application Page. Simply fill out the form, submit your documents, and make the required payment.",
	},
	{
		question: "What are the admission requirements?",
		answer: "Most programs require a minimum of a high school diploma or equivalent. Some advanced courses may require prior experience in forensic investigations, accounting, or law enforcement.",
	},
	{
		question: "How much do courses cost?",
		answer: "Tuition fees vary by program. Please visit our Tuition Fees Page for detailed pricing information.",
	},
	{
		question: "Do you offer payment plans?",
		answer: "Yes, flexible payment options are available for select programs. Contact our admissions office for more details.",
	},
	{
		question: "What payment methods do you accept?",
		answer: "We accept payments via bank transfer, credit/debit cards, PayPal, and mobile money.",
	},
];

export const testimonials = [
	{
		image: "/assets/images/user-one.jpeg",
		name: "Tomiwa Adelae",
		testimony:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam eius molestiae illo id, ab dolor modi, est aut atque iure facilis reiciendis ex exercitationem, perspiciatis fugiat consequuntur ? Dolor, itaque.",
		rotate: "lg:-rotate-6",
	},
	{
		image: "/assets/images/user-two.webp",
		name: "Sandra Reddington",
		testimony:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam eius molestiae illo id, ab dolor modi, est aut atque iure facilis reiciendis ex exercitationem, perspiciatis fugiat consequuntur ? Dolor, itaque.",
		rotate: "rotate-0",
	},
	{
		image: "/assets/images/user-three.jpg",
		name: "Israel Ibitoye",
		testimony:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam eius molestiae illo id, ab dolor modi, est aut atque iure facilis reiciendis ex exercitationem, perspiciatis fugiat consequuntur ? Dolor, itaque.",
		textColor: "text-orange-400",
		rotate: "lg:rotate-6",
	},
];

export const faculities = [
	{
		image: "/assets/images/user-one.jpeg",
		name: "Tomiwa Adelae",
		position: "CEO, Lead professor",
	},
	{
		image: "/assets/images/user-one.jpeg",
		name: "Tomiwa Adelae",
		position: "CEO, Lead professor",
	},
	{
		image: "/assets/images/user-one.jpeg",
		name: "Tomiwa Adelae",
		position: "CEO, Lead professor",
	},
];

export const latestNews = [
	{
		title: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam perspiciatis amet",
		slug: "/12345",
		image: "/assets/images/news-one.jpg",
		date: "24/09/2024",
	},
	{
		title: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam perspiciatis amet",
		slug: "/12345",
		image: "/assets/images/news-two.jpg",
		date: "12/02/2024",
	},
	{
		title: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam perspiciatis amet",
		slug: "/12345",
		image: "/assets/images/news-two.jpg",
		date: "12/02/2024",
	},
	{
		title: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam perspiciatis amet",
		slug: "/12345",
		image: "/assets/images/news-one.jpg",
		date: "12/02/2024",
	},
];

export const aboutDetails = [
	{
		icon: Award,
		title: "Accredited by IICFIP USA",
		description:
			"Recognized by the International Institute of Certified Forensic Investigation Professionals (IICFIP), USA, ensuring globally accepted certifications.",
	},
	{
		icon: Laptop,
		title: "100% Online Learning",
		description:
			"Flexible, self-paced courses delivered through our Moodle LMS platform, learn from anywhere in the world!",
	},
	{
		icon: UserCheck,
		title: "Expert Instructors",
		description:
			"Our courses are taught by leading forensic professionals, fraud auditors, and legal experts with real-world experience.",
	},
	{
		icon: CircleDollarSign,
		title: "Flexible payment",
		description:
			"Payment with WASFS has been simplified to make the entire journey smooth and stress-free. Your satisfaction is our upmost accomplishment.",
	},
];
