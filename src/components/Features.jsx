// src/components/Features.jsx
import { motion } from "framer-motion";
import { ShoppingBag, Cpu, Shield, Truck, CreditCard, Star } from "lucide-react";

const features = [
  {
    icon: <ShoppingBag className="w-10 h-10 text-pink-500" />,
    title: "Wide Product Range",
    description: "Find everything from electronics to fashion in one place.",
  },
  {
    icon: <Cpu className="w-10 h-10 text-blue-500" />,
    title: "Latest Technology",
    description: "Stay ahead with gadgets powered by cutting-edge innovation.",
  },
  {
    icon: <Shield className="w-10 h-10 text-green-500" />,
    title: "Secure Shopping",
    description: "Your data and payments are fully protected with us.",
  },
  {
    icon: <Truck className="w-10 h-10 text-orange-500" />,
    title: "Fast Delivery",
    description: "Get your products delivered quickly and safely.",
  },
  {
    icon: <CreditCard className="w-10 h-10 text-purple-500" />,
    title: "Easy Payments",
    description: "Multiple payment options with smooth checkout.",
  },
  {
    icon: <Star className="w-10 h-10 text-yellow-500" />,
    title: "Top Quality",
    description: "We ensure the best quality across all products.",
  },
];

export default function Features() {
  return (
    <section className="relative py-20 bg-white">
      {/* Title */}
      <div className="text-center mb-14">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-gray-900"
        >
          Why Shop With Us?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-gray-600 mt-4"
        >
          Experience a seamless shopping journey like never before.
        </motion.p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-md p-8 border border-gray-100 hover:shadow-xl transition duration-300"
          >
            <div className="mb-5">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
