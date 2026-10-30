import { Info, PhoneCall } from "lucide-react";

export default function TopBar() {
  return (
    <div className="topbar">
      <div className="container topbar__row">
        <p className="topbar__note">
          <Info size={14} aria-hidden="true" />
          <span>Report problems in your neighbourhood and follow them until they are fixed.</span>
        </p>
        <p className="topbar__emergency">
          <PhoneCall size={14} aria-hidden="true" />
          <span>
            Emergency? Call <strong>999</strong>
          </span>
        </p>
      </div>
    </div>
  );
}
