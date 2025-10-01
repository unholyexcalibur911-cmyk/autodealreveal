"use client";

import {useEffect, useState } from "react";
import { motion } from "framer-motion";

import React from "react";
import emailjs from "@emailjs/browser";

const labelVariants = {
	focused: {
		top: "0px",
		left: "12px",
		fontSize: "0.75rem",
		color: "#2563eb",
		backgroundColor: "#2b2d42",
		padding: "0 0.25rem",
	},
	unfocused: {
		top: "50%",
		left: "16px",
		fontSize: "1rem",
		color: "#6b7280",
		backgroundColor: "rgba(0,0,0,0)",
		padding: "0",
		translateY: "-50%",
	},
};

const Support: React.FC = () => {
	const [open, setOpen] = useState(false);
	const [form, setForm] = useState({
		fullName: "",
		email: "",
		issue: "",
		details: "",
	});
	const [sending, setSending] = useState(false);
	const [sent, setSent] = useState(false);
	const [error, setError] = useState("");

	return (
		<>
			<button
				className="z-50 bg-transparent border text-[#2b2d42] flex items-center gap-2 px-6 py-2 rounded-full shadow-lg hover:bg-blue-900 hover:text-white transition-all group"
				onClick={() => setOpen(true)}
				aria-label="Support"
			>
				Support
			</button>
			{open && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
					<div className="relative bg-[#2b2d42] w-full max-w-4xl px-8 py-10 rounded-lg shadow-xl text-center">
						<button
							className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
							onClick={() => setOpen(false)}
							aria-label="Close"
						>
							<span aria-hidden="true">×</span>
							<span className="sr-only">Close</span>
						</button>
						<h1 className="text-4xl text-gray-300 mb-2">Support Request</h1>
						<form
							className="space-y-6"
							onSubmit={async (e) => {
								e.preventDefault();
								setSending(true);
								setError("");
								setSent(false);
								try {
									await emailjs.send(
										"service_y22dn7p",
										"template_8odl0pt",
										{
											full_name: form.fullName,
											from_email: form.email,
											issue: form.issue,
											details: form.details,
										},
										"ZnKdIvcglCuqM1yxP"
									);
									setSent(true);
									setForm({ fullName: "", email: "", issue: "", details: "" });
								} catch (err) {
									setError("Failed to send. Please try again.");
								}
								setSending(false);
							}}
						>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-stone-100">
								<div className="relative">
									<input
										type="text"
										value={form.fullName}
										onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))}
										className="w-full border-b-2 border-white bg-transparent px-4 pt-6 pb-3 focus:outline-none focus:border-blue-600"
									/>
									<motion.span
										initial="unfocused"
										animate={form.fullName ? "focused" : "unfocused"}
										variants={labelVariants}
										style={{ position: "absolute", pointerEvents: "none" }}
									>
										Full Name
									</motion.span>
								</div>
								<div className="relative">
									<input
										type="email"
										required
										value={form.email}
										onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
										className="w-full border-b-2 border-white bg-transparent px-4 pt-6 pb-3 focus:outline-none focus:border-blue-600"
									/>
									<motion.span
										initial="unfocused"
										animate={form.email ? "focused" : "unfocused"}
										variants={labelVariants}
										style={{ position: "absolute", pointerEvents: "none" }}
									>
										Email
									</motion.span>
								</div>
								<div className="md:col-span-2 relative">
									<motion.span
										initial="unfocused"
										animate={form.issue ? "focused" : "unfocused"}
										variants={labelVariants}
										style={{ position: "absolute", pointerEvents: "none" }}
									>
										Issue Type
									</motion.span>
									<select
										id="issue"
										value={form.issue}
										onChange={e => setForm(f => ({ ...f, issue: e.target.value }))}
										className="w-full border-b-2 border-white bg-transparent px-4 pt-6 pb-3 focus:outline-none focus:border-blue-600"
									>
										<option value=""></option>
										<option value="Login Problem">Login Problem</option>
										<option value="Data Issue">Data Issue</option>
										<option value="Feature Request">Feature Request</option>
										<option value="Bug Report">Bug Report</option>
										<option value="Other">Other</option>
									</select>
								</div>
								<div className="md:col-span-2 relative">
									<textarea
										rows={4}
										value={form.details}
										onChange={e => setForm(f => ({ ...f, details: e.target.value }))}
										className="w-full border-b-2 border-white bg-transparent px-4 pt-6 pb-3 focus:outline-none focus:border-blue-600 resize-none"
									/>
									<motion.span
										initial="unfocused"
										animate={form.details ? "focused" : "unfocused"}
										variants={labelVariants}
										style={{ position: "absolute", pointerEvents: "none" }}
									>
										Details (please describe your issue)
									</motion.span>
								</div>
							</div>
							<button
								type="submit"
								className="w-55 rounded-2xl rounded bg-[#115596] py-3 font-semibold text-white hover:bg-[#cd2b29]"
								disabled={sending}
							>
								{sending ? "Sending..." : "Submit Support Request"}
							</button>
							{sent && <div className="text-green-400 mt-2">Support request sent!</div>}
							{error && <div className="text-red-400 mt-2">{error}</div>}
						</form>
					</div>
				</div>
			)}
		</>
	);
};

export default Support;

