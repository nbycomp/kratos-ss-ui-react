import React from "react";
import { Link } from "react-router-dom";
import { IconLogo } from "components/IconLogo";
import { IconGear } from "components/IconGear";
import { IconSignOut } from "components/IconSignOut";
import { endpoints } from "services/redirect";
import { IconRepoForked } from "components/IconRepoForked";
import { useSession } from "services/session";

export const Header = () => {
  const { session } = useSession();
  return (
    <div className="header">
      <Link to="/">
        <IconLogo />
      </Link>
      <div className="icon-actions">
        {session?.active && (
          <React.Fragment>
            <div className="settings">
              <a href={endpoints.settings}>
                <IconGear />
              </a>
            </div>
            <div className="logout">
              <a href={endpoints.logout}>
                <IconSignOut />
              </a>
            </div>
          </React.Fragment>
        )}
        <div className="fork">
          <a
            href="https://github.com/ellioseven/kratos-ss-ui-react"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconRepoForked />
            <div>
              Fork on
              <br />
              GitHub
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};
