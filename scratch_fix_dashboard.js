const fs = require('fs');
let code = fs.readFileSync('app/dashboard/page.tsx', 'utf8');

code = '"use client";\n\n' + code;
code = code.replace(`import Link from 'next/link';`, `import Link from 'next/link';\nimport { motion } from 'framer-motion';\n\nconst containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };\nconst itemVariants = { hidden: { opacity: 0, scale: 0.95, y: 20 }, show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } };`);

code = code.replace('<div className="grid grid-cols-1 md:grid-cols-6 gap-6">', '<motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 md:grid-cols-6 gap-6">');

// 1. Symptom Analysis
code = code.replace('<Link href="/symptoms" className="md:col-span-4 ', '<motion.div variants={itemVariants} className="md:col-span-4"><Link href="/symptoms" className="h-full ');
code = code.replace('</Link>\n\n          {/* Emergency Card (Accent) */}', '</Link></motion.div>\n\n          {/* Emergency Card (Accent) */}');

// 2. Emergency Card
code = code.replace('<Link href="/emergency" className="md:col-span-2 ', '<motion.div variants={itemVariants} className="md:col-span-2"><Link href="/emergency" className="h-full ');
code = code.replace('</Link>\n\n          {/* Find Nearby Doctors */}', '</Link></motion.div>\n\n          {/* Find Nearby Doctors */}');

// 3. Find Nearby Doctors
code = code.replace('<Link href="/doctors" className="md:col-span-2 ', '<motion.div variants={itemVariants} className="md:col-span-2"><Link href="/doctors" className="h-full ');
code = code.replace('</Link>\n\n          {/* Book Call */}', '</Link></motion.div>\n\n          {/* Book Call */}');

// 4. Book Call
code = code.replace('<div className="md:col-span-2 glass-panel', '<motion.div variants={itemVariants} className="md:col-span-2"><div className="h-full glass-panel');
code = code.replace('</div>\n\n          {/* Pharmacy */}', '</div></motion.div>\n\n          {/* Pharmacy */}');

// 5. Pharmacy
code = code.replace('<div className="md:col-span-1 glass-panel', '<motion.div variants={itemVariants} className="md:col-span-1"><div className="h-full glass-panel');
code = code.replace('</div>\n\n          {/* Vault (Records) */}', '</div></motion.div>\n\n          {/* Vault (Records) */}');

// 6. Vault
code = code.replace('<Link href="/insights" className="md:col-span-1 ', '<motion.div variants={itemVariants} className="md:col-span-1"><Link href="/insights" className="h-full ');
code = code.replace('</Link>\n        </div>', '</Link></motion.div>\n        </motion.div>');

fs.writeFileSync('app/dashboard/page.tsx', code);
console.log('Modified app/dashboard/page.tsx');
