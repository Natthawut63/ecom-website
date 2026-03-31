export const getStatusColor = (status) => {
    switch (status) {
      case "Not Process":
        return "bg-gray-400";
      case "Processing":
        return "bg-yellow-400";
      case "Complete":
        return "bg-green-400";
      case "Cancal":
        return "bg-red-400";
    }
  };