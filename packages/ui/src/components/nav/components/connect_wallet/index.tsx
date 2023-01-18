import useConnectWalletList from '@/components/nav/components/connect_wallet/hooks';
import { useStyles } from '@/components/nav/components/connect_wallet/styles';
import LoginIcon from 'shared-utils/assets/icon-login.svg';
import LogoutIcon from 'shared-utils/assets/icon-logout.svg';
import React, { FC } from 'react';
import AuthorizeConnectionDialog from '@/components/nav/components/connect_wallet/authorize_connection';
import InstallKeplrWalletDialog from '@/components/nav/components/connect_wallet/install_keplr_wallet';
import LoginDialog from '@/components/nav/components/connect_wallet/login';
import LoginSuccessDialog from '@/components/nav/components/connect_wallet/login_success';
import PairKeplrWalletDialog from '@/components/nav/components/connect_wallet/pair_keplr_wallet';
import ConnectWalletConnectDialog from '@/components/nav/components/connect_wallet/connect_wallet_connect';
import { readIsUserLoggedIn } from '@/recoil/user';
import { useRecoilValue } from 'recoil';
import {
  readOpenAuthorizeConnectionDialog,
  readOpenInstallKeplrExtensionDialog,
  readOpenLoginDialog,
  readOpenLoginSuccessDialog,
  readOpenPairConnectWalletDialog,
  readOpenPairKeplrExtensionDialog,
  readWalletConnectURI,
  readWalletSelection,
} from '@/recoil/wallet';

type ConnectWalletProps = {
  className?: string;
};

const ConnectWallet: FC<ConnectWalletProps> = () => {
  const { classes } = useStyles();
  const loggedIn = useRecoilValue(readIsUserLoggedIn);
  const openLoginDialog = useRecoilValue(readOpenLoginDialog);
  const walletSelection = useRecoilValue(readWalletSelection);
  const openInstallKeplrExtensionDialog = useRecoilValue(readOpenInstallKeplrExtensionDialog);
  const openPairKeplrExtensionDialog = useRecoilValue(readOpenPairKeplrExtensionDialog);
  const openAuthorizeConnectionDialog = useRecoilValue(readOpenAuthorizeConnectionDialog);
  const openLoginSuccessDialog = useRecoilValue(readOpenLoginSuccessDialog);
  const openPairConnectWalletDialog = useRecoilValue(readOpenPairConnectWalletDialog);
  const walletConnectURI = useRecoilValue(readWalletConnectURI);

  const {
    continueToAuthorizeKeplrConnectionDialog,
    continueToKeplrExtensionPairingDialog,
    continueToLoginSuccessDialog,
    errorMsg,
    handleCloseAuthorizeConnectionDialog,
    handleCloseInstallKeplrWalletDialog,
    handleCloseKeplrPairingDialog,
    handleCloseLoginDialog,
    handleCloseLoginSuccessDialog,
    handleClosetWalletConnectDialog,
    handleConnectWallet,
    handleLogin,
    handleLogout,
    setWalletOption,
  } = useConnectWalletList();
  return (
    <div>
      <div
        onClick={loggedIn ? handleLogout : handleLogin}
        role="button"
        className={classes.icon}
        tabIndex={0}
        aria-label="connect-wallet-button"
      >
        {loggedIn ? <LogoutIcon /> : <LoginIcon />}
      </div>
      <LoginDialog
        open={openLoginDialog}
        setWallet={setWalletOption}
        onClose={handleCloseLoginDialog}
        onContinue={handleConnectWallet}
      />
      <InstallKeplrWalletDialog
        walletName={walletSelection}
        walletUrl="https://www.keplr.app/download"
        open={openInstallKeplrExtensionDialog}
        onClose={handleCloseInstallKeplrWalletDialog}
        onContinue={continueToKeplrExtensionPairingDialog}
      />
      <PairKeplrWalletDialog
        walletName={walletSelection}
        open={openPairKeplrExtensionDialog}
        onClose={handleCloseKeplrPairingDialog}
        onContinue={continueToAuthorizeKeplrConnectionDialog}
      />
      <AuthorizeConnectionDialog
        open={openAuthorizeConnectionDialog}
        errorMsg={errorMsg}
        onClose={handleCloseAuthorizeConnectionDialog}
        onContinue={continueToLoginSuccessDialog}
      />
      <ConnectWalletConnectDialog
        open={openPairConnectWalletDialog}
        walletConnectURI={walletConnectURI}
        onClose={handleClosetWalletConnectDialog}
        onContinue={null}
      />
      <LoginSuccessDialog
        open={openLoginSuccessDialog}
        onClose={handleCloseLoginSuccessDialog}
        onContinue={handleCloseLoginSuccessDialog}
      />
    </div>
  );
};

export default ConnectWallet;
