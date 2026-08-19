import { z } from 'zod';

declare const Address: z.ZodString;
type Address = z.infer<typeof Address>;
declare const IAsset: z.ZodUnion<readonly [z.ZodString, z.ZodString]>;
type IAsset = z.infer<typeof IAsset>;

declare const RampName: z.ZodString;
type RampName = z.infer<typeof RampName>;
declare const Feature: z.ZodEnum<{
    BETA_EDGES: "BETA_EDGES";
    ORG_BETA_EDGES: "ORG_BETA_EDGES";
    ORG_EDGES: "ORG_EDGES";
}>;
type Feature = z.infer<typeof Feature>;

declare const TransactionRequest: z.ZodObject<{
    to: z.ZodPipe<z.ZodString, z.ZodTransform<`0x${string}`, string>>;
    from: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<`0x${string}`, string>>>;
    nonce: z.ZodOptional<z.ZodNumber>;
    gasLimit: z.ZodOptional<z.ZodBigInt>;
    gasPrice: z.ZodOptional<z.ZodBigInt>;
    maxPriorityFeePerGas: z.ZodOptional<z.ZodBigInt>;
    maxFeePerGas: z.ZodOptional<z.ZodBigInt>;
    data: z.ZodOptional<z.ZodString>;
    value: z.ZodOptional<z.ZodBigInt>;
    chainId: z.ZodNumber;
}, z.core.$strip>;
type TransactionRequest = z.infer<typeof TransactionRequest>;
declare const TransactionReceipt: z.ZodObject<{
    transactionHash: z.ZodOptional<z.ZodString>;
    blockHash: z.ZodOptional<z.ZodString>;
    blockNumber: z.ZodOptional<z.ZodNumber>;
    from: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<`0x${string}`, string>>>;
    to: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<`0x${string}`, string>>>;
    rawReceipt: z.ZodAny;
}, z.core.$strip>;
type TransactionReceipt = z.infer<typeof TransactionReceipt>;
declare const SolTransactionRequest: z.ZodObject<{
    from: z.ZodString;
    serializedTransaction: z.ZodString;
}, z.core.$strip>;
type SolTransactionRequest = z.infer<typeof SolTransactionRequest>;
declare const SolTransactionReceipt: z.ZodObject<{
    signature: z.ZodString;
}, z.core.$strip>;
type SolTransactionReceipt = z.infer<typeof SolTransactionReceipt>;
declare const EVMChainConfig: z.ZodObject<{
    chain_id: z.ZodBigInt;
    network: z.ZodString;
    explorer: z.ZodOptional<z.ZodURL>;
    image: z.ZodOptional<z.ZodURL>;
    is_testnet: z.ZodBoolean;
    address_family: z.ZodLiteral<"EVM">;
    native_currency: z.ZodObject<{
        name: z.ZodString;
        symbol: z.ZodString;
        decimals: z.ZodNumber;
    }, z.core.$strip>;
    rpc: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
type EVMChainConfig = z.infer<typeof EVMChainConfig>;
declare const SolChainConfig: z.ZodObject<{
    chain_id: z.ZodBigInt;
    network: z.ZodString;
    explorer: z.ZodOptional<z.ZodURL>;
    image: z.ZodOptional<z.ZodURL>;
    is_testnet: z.ZodBoolean;
    address_family: z.ZodLiteral<"SOL">;
}, z.core.$strip>;
type SolChainConfig = z.infer<typeof SolChainConfig>;

type TypedData = string;
declare const WindowType: z.ZodEnum<{
    MODAL: "MODAL";
    EMBED: "EMBED";
}>;
type WindowType = z.infer<typeof WindowType>;
declare const BorderStyle: z.ZodEnum<{
    SQUARE: "SQUARE";
    DEFAULT: "DEFAULT";
}>;
type BorderStyle = z.infer<typeof BorderStyle>;
declare const BackgroundStyle: z.ZodEnum<{
    BLUR: "BLUR";
    OFF: "OFF";
}>;
type BackgroundStyle = z.infer<typeof BackgroundStyle>;
declare const CssFontSize: z.ZodString;
type CssFontSize = z.infer<typeof CssFontSize>;
declare const CustomStyles: z.ZodObject<{
    primaryColor: z.ZodOptional<z.ZodString>;
    backgroundColor: z.ZodOptional<z.ZodString>;
    borderColor: z.ZodOptional<z.ZodString>;
    textColor: z.ZodOptional<z.ZodString>;
    textSecondaryColor: z.ZodOptional<z.ZodString>;
    accentColor: z.ZodOptional<z.ZodString>;
    borderStyle: z.ZodOptional<z.ZodEnum<{
        SQUARE: "SQUARE";
        DEFAULT: "DEFAULT";
    }>>;
    successColor: z.ZodOptional<z.ZodString>;
    alertColor: z.ZodOptional<z.ZodString>;
    zIndex: z.ZodOptional<z.ZodNumber>;
    componentShadow: z.ZodOptional<z.ZodString>;
    backgroundStyle: z.ZodOptional<z.ZodEnum<{
        BLUR: "BLUR";
        OFF: "OFF";
    }>>;
}, z.core.$strip>;
type CustomStyles = z.infer<typeof CustomStyles>;
declare const OrderStatus: z.ZodAny;
type OrderStatus = z.infer<typeof OrderStatus>;
declare const OrderNotification: z.ZodObject<{
    paymentId: z.ZodString;
    issue: z.ZodString;
    message: z.ZodString;
}, z.core.$strip>;
type OrderNotification = z.infer<typeof OrderNotification>;
declare const FontName: z.ZodString;
type FontName = z.infer<typeof FontName>;
declare const HeaderTitle: z.ZodOptional<z.ZodString>;
type HeaderTitle = z.infer<typeof HeaderTitle>;
type SignMessage = (input: {
    message: string;
    ownerAddress?: Address;
}) => Promise<string>;
type SignTypedData = (input: {
    typedData: TypedData;
    ownerAddress?: Address;
}) => Promise<string>;
declare const WalletAuthChain: z.ZodEnum<{
    EVM: "EVM";
    SOL: "SOL";
    SUI: "SUI";
}>;
type WalletAuthChain = z.infer<typeof WalletAuthChain>;
declare const WalletVm: z.ZodEnum<{
    EVM: "EVM";
    SOL: "SOL";
}>;
type WalletVm = z.infer<typeof WalletVm>;
type SignAuthMessage = (input: {
    message: string;
    address: Address;
    walletType: WalletAuthChain;
}) => Promise<string>;
type SendTransaction = (transaction: TransactionRequest, chainConfig: EVMChainConfig) => Promise<TransactionReceipt>;
type WalletActionsType = {
    getAddress: () => Promise<Address>;
    signMessage: SignMessage;
    sendTransaction: SendTransaction;
    signTypedData: SignTypedData;
    walletType?: WalletVm;
};
type StatusCallback = (input: {
    type: string;
    payload: OrderStatus;
}) => void;
type NotificationsCallback = (notifications: OrderNotification[]) => void;
declare const PaymentFlowType: z.ZodEnum<{
    wallet: "wallet";
    cash: "cash";
    exchange: "exchange";
    deposit: "deposit";
    recover: "recover";
    withdraw: "withdraw";
}>;
type PaymentFlowType = z.infer<typeof PaymentFlowType>;
declare const PaymentDirection: z.ZodEnum<{
    inbound: "inbound";
    outbound: "outbound";
}>;
type PaymentDirection = z.infer<typeof PaymentDirection>;
/**
 * Host-provided checkout session — the SDK is the source of truth for this contract (halliday-apps
 * will later import it in place of its local copy). Mirrors halliday-apps `types/paymentFlow.ts`.
 * On OUTPUT (z.infer) `direction` defaults to 'inbound' and `locked` to false (both required); on
 * INPUT (z.input) both are optional — hence the open* method args use `z.input<...>`.
 */
declare const PaymentSession: z.ZodObject<{
    direction: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        inbound: "inbound";
        outbound: "outbound";
    }>>>;
    input: z.ZodOptional<z.ZodObject<{
        asset: z.ZodString;
        amount: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    output: z.ZodOptional<z.ZodString>;
    inputFiatValue: z.ZodOptional<z.ZodObject<{
        currency: z.ZodString;
        amount: z.ZodString;
    }, z.core.$strip>>;
    fundingAddress: z.ZodOptional<z.ZodString>;
    destination: z.ZodOptional<z.ZodString>;
    locked: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, z.core.$strip>;
type PaymentSession = z.infer<typeof PaymentSession>;
declare const WalletMeta: z.ZodObject<{
    address: z.ZodString;
    walletName: z.ZodOptional<z.ZodString>;
    flowType: z.ZodOptional<z.ZodEnum<{
        wallet: "wallet";
        cash: "cash";
        exchange: "exchange";
        deposit: "deposit";
        recover: "recover";
        withdraw: "withdraw";
    }>>;
    walletType: z.ZodCatch<z.ZodOptional<z.ZodEnum<{
        EVM: "EVM";
        SOL: "SOL";
    }>>>;
}, z.core.$strip>;
type WalletMeta = z.infer<typeof WalletMeta>;
declare const UserWalletFunderDisplay: z.ZodEnum<{
    SHOW: "SHOW";
    HIDE: "HIDE";
}>;
type UserWalletFunderDisplay = z.infer<typeof UserWalletFunderDisplay>;
declare const FeeSponsorshipGrant: z.ZodObject<{
    grantPayload: z.ZodString;
    grantSignature: z.ZodString;
}, z.core.$strip>;
type FeeSponsorshipGrant = z.infer<typeof FeeSponsorshipGrant>;
declare const PaymentsWidgetSDKParamsWithoutRolesAndFunctions: z.ZodObject<{
    sandbox: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    inputs: z.ZodOptional<z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodString]>>>;
    outputs: z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodString]>>;
    apiKey: z.ZodString;
    withdrawInputs: z.ZodOptional<z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodString]>>>;
    profileName: z.ZodOptional<z.ZodString>;
    customStyles: z.ZodOptional<z.ZodObject<{
        primaryColor: z.ZodOptional<z.ZodString>;
        backgroundColor: z.ZodOptional<z.ZodString>;
        borderColor: z.ZodOptional<z.ZodString>;
        textColor: z.ZodOptional<z.ZodString>;
        textSecondaryColor: z.ZodOptional<z.ZodString>;
        accentColor: z.ZodOptional<z.ZodString>;
        borderStyle: z.ZodOptional<z.ZodEnum<{
            SQUARE: "SQUARE";
            DEFAULT: "DEFAULT";
        }>>;
        successColor: z.ZodOptional<z.ZodString>;
        alertColor: z.ZodOptional<z.ZodString>;
        zIndex: z.ZodOptional<z.ZodNumber>;
        componentShadow: z.ZodOptional<z.ZodString>;
        backgroundStyle: z.ZodOptional<z.ZodEnum<{
            BLUR: "BLUR";
            OFF: "OFF";
        }>>;
    }, z.core.$strip>>;
    targetElementId: z.ZodOptional<z.ZodString>;
    fontName: z.ZodOptional<z.ZodString>;
    headerTitle: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    destinationAddress: z.ZodOptional<z.ZodString>;
    withdrawDestinationAddress: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
type SolSendTransaction = (transaction: SolTransactionRequest, chainConfig: SolChainConfig) => Promise<SolTransactionReceipt>;
/**
 * EVM funder. NARROWS the inherited `WalletActionsType["walletType"]` to the literal, which is what
 * keeps `FunderRole` a usable discriminated union — with the base's `WalletVm` left unnarrowed,
 * `Extract<FunderRole, { walletType: "SOL" }>` resolves to `never`. Still OPTIONAL so existing
 * untagged host code typechecks.
 */
type EvmFunderRole = Omit<WalletActionsType, "signTypedData" | "signMessage"> & {
    walletType?: "EVM";
    walletName?: string;
};
/** SOL funder. The tag is REQUIRED — it is what discriminates the union. */
type SolFunderRole = {
    walletType: "SOL";
    getAddress: () => Promise<Address>;
    sendTransaction: SolSendTransaction;
    walletName?: string;
};
type FunderRole = EvmFunderRole | SolFunderRole;
type EvmWalletRole = WalletActionsType & {
    walletType: "EVM";
};
type OwnerRole = Omit<WalletActionsType, "sendTransaction"> & {
    sendTransaction?: SendTransaction;
    walletName?: string;
    walletType?: "EVM";
};
type Owner = ({
    type?: "direct";
} & OwnerRole) | {
    type: "wallet-auth";
    walletType: WalletAuthChain;
    address: Address;
    signAuthMessage: SignAuthMessage;
} | {
    type: "otp-auth";
    address: string;
};
declare const PaymentsWidgetSDKParams: z.ZodObject<{
    apiKey: z.ZodString;
    outputs: z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodString]>>;
    inputs: z.ZodOptional<z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodString]>>>;
    sandbox: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    withdrawInputs: z.ZodOptional<z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodString]>>>;
    profileName: z.ZodOptional<z.ZodString>;
    customStyles: z.ZodOptional<z.ZodObject<{
        primaryColor: z.ZodOptional<z.ZodString>;
        backgroundColor: z.ZodOptional<z.ZodString>;
        borderColor: z.ZodOptional<z.ZodString>;
        textColor: z.ZodOptional<z.ZodString>;
        textSecondaryColor: z.ZodOptional<z.ZodString>;
        accentColor: z.ZodOptional<z.ZodString>;
        borderStyle: z.ZodOptional<z.ZodEnum<{
            SQUARE: "SQUARE";
            DEFAULT: "DEFAULT";
        }>>;
        successColor: z.ZodOptional<z.ZodString>;
        alertColor: z.ZodOptional<z.ZodString>;
        zIndex: z.ZodOptional<z.ZodNumber>;
        componentShadow: z.ZodOptional<z.ZodString>;
        backgroundStyle: z.ZodOptional<z.ZodEnum<{
            BLUR: "BLUR";
            OFF: "OFF";
        }>>;
    }, z.core.$strip>>;
    targetElementId: z.ZodOptional<z.ZodString>;
    fontName: z.ZodOptional<z.ZodString>;
    headerTitle: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    onStatus: z.ZodOptional<z.ZodAny>;
    onNotifications: z.ZodOptional<z.ZodAny>;
    onConnectWallet: z.ZodOptional<z.ZodAny>;
    generateFeeSponsorshipGrant: z.ZodOptional<z.ZodAny>;
    funder: z.ZodOptional<z.ZodObject<{
        getAddress: z.ZodAny;
        signMessage: z.ZodOptional<z.ZodAny>;
        sendTransaction: z.ZodOptional<z.ZodAny>;
        signTypedData: z.ZodOptional<z.ZodAny>;
        walletName: z.ZodOptional<z.ZodString>;
        walletType: z.ZodCatch<z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodEnum<{
            EVM: "EVM";
            SOL: "SOL";
        }>>>>;
    }, z.core.$strip>>;
    funders: z.ZodOptional<z.ZodArray<z.ZodObject<{
        getAddress: z.ZodAny;
        signMessage: z.ZodOptional<z.ZodAny>;
        sendTransaction: z.ZodOptional<z.ZodAny>;
        signTypedData: z.ZodOptional<z.ZodAny>;
        walletName: z.ZodOptional<z.ZodString>;
        walletType: z.ZodCatch<z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodEnum<{
            EVM: "EVM";
            SOL: "SOL";
        }>>>>;
    }, z.core.$strip>>>;
    owner: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodDiscriminatedUnion<[z.ZodObject<{
        getAddress: z.ZodAny;
        signMessage: z.ZodOptional<z.ZodAny>;
        sendTransaction: z.ZodOptional<z.ZodAny>;
        signTypedData: z.ZodOptional<z.ZodAny>;
        walletName: z.ZodOptional<z.ZodString>;
        walletType: z.ZodCatch<z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodEnum<{
            EVM: "EVM";
            SOL: "SOL";
        }>>>>;
        type: z.ZodLiteral<"direct">;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"wallet-auth">;
        walletType: z.ZodEnum<{
            EVM: "EVM";
            SOL: "SOL";
            SUI: "SUI";
        }>;
        address: z.ZodString;
        signAuthMessage: z.ZodAny;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"otp-auth">;
        address: z.ZodEmail;
    }, z.core.$strip>], "type">>>;
    destinationAddress: z.ZodOptional<z.ZodString>;
    withdrawFunder: z.ZodOptional<z.ZodObject<{
        getAddress: z.ZodAny;
        signMessage: z.ZodOptional<z.ZodAny>;
        sendTransaction: z.ZodOptional<z.ZodAny>;
        signTypedData: z.ZodOptional<z.ZodAny>;
        walletName: z.ZodOptional<z.ZodString>;
        walletType: z.ZodCatch<z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodEnum<{
            EVM: "EVM";
            SOL: "SOL";
        }>>>>;
    }, z.core.$strip>>;
    withdrawDestinationAddress: z.ZodOptional<z.ZodString>;
    onReady: z.ZodOptional<z.ZodAny>;
    onError: z.ZodOptional<z.ZodAny>;
}, z.core.$strip>;
type PaymentsWidgetSDKParams = z.input<typeof PaymentsWidgetSDKParamsWithoutRolesAndFunctions> & {
    funder?: FunderRole;
    funders?: FunderRole[];
    withdrawFunder?: FunderRole;
    owner?: Owner;
    onStatus?: StatusCallback;
    onNotifications?: NotificationsCallback;
    onReady?: () => void;
    onError?: (error: Error) => void;
    onConnectWallet?: () => void;
    generateFeeSponsorshipGrant?: (payload: string) => Promise<string>;
};
declare const featureFlags: z.ZodRecord<z.ZodString, z.ZodBoolean>;
/** @internal — internal/testing feature flags; replaced wholesale on update. */
type FeatureFlags = z.infer<typeof featureFlags>;
declare const AppMode: z.ZodEnum<{
    FULL: "FULL";
    MODAL: "MODAL";
    OVERLAY: "OVERLAY";
    EMBED: "EMBED";
}>;
type AppMode = z.infer<typeof AppMode>;
declare const OwnerMeta: z.ZodObject<{
    address: z.ZodString;
    walletName: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodEnum<{
        direct: "direct";
        "wallet-auth": "wallet-auth";
        "otp-auth": "otp-auth";
    }>>;
    walletType: z.ZodCatch<z.ZodOptional<z.ZodEnum<{
        EVM: "EVM";
        SOL: "SOL";
        SUI: "SUI";
    }>>>;
}, z.core.$strip>;
type OwnerMeta = z.infer<typeof OwnerMeta>;
declare const PaymentsWidgetQueryParams: z.ZodObject<{
    session: z.ZodOptional<z.ZodObject<{
        direction: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
            inbound: "inbound";
            outbound: "outbound";
        }>>>;
        input: z.ZodOptional<z.ZodObject<{
            asset: z.ZodString;
            amount: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
        output: z.ZodOptional<z.ZodString>;
        inputFiatValue: z.ZodOptional<z.ZodObject<{
            currency: z.ZodString;
            amount: z.ZodString;
        }, z.core.$strip>>;
        fundingAddress: z.ZodOptional<z.ZodString>;
        destination: z.ZodOptional<z.ZodString>;
        locked: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    }, z.core.$strip>>;
    appMode: z.ZodOptional<z.ZodEnum<{
        FULL: "FULL";
        MODAL: "MODAL";
        OVERLAY: "OVERLAY";
        EMBED: "EMBED";
    }>>;
    apiBaseUrl: z.ZodOptional<z.ZodString>;
    targetView: z.ZodOptional<z.ZodString>;
    show: z.ZodOptional<z.ZodBoolean>;
    hasOwner: z.ZodBoolean;
    hasTxHandler: z.ZodBoolean;
    hasConnect: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    hasFeeSponsorship: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    hostOrigin: z.ZodNullable<z.ZodURL>;
    hostUrl: z.ZodOptional<z.ZodNullable<z.ZodURL>>;
    ipAddress: z.ZodOptional<z.ZodUnion<readonly [z.ZodIPv4, z.ZodIPv6]>>;
    featureFlags: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodBoolean>>;
    ownerMeta: z.ZodOptional<z.ZodObject<{
        address: z.ZodString;
        walletName: z.ZodOptional<z.ZodString>;
        type: z.ZodOptional<z.ZodEnum<{
            direct: "direct";
            "wallet-auth": "wallet-auth";
            "otp-auth": "otp-auth";
        }>>;
        walletType: z.ZodCatch<z.ZodOptional<z.ZodEnum<{
            EVM: "EVM";
            SOL: "SOL";
            SUI: "SUI";
        }>>>;
    }, z.core.$strip>>;
    funderMeta: z.ZodOptional<z.ZodArray<z.ZodObject<{
        address: z.ZodString;
        walletName: z.ZodOptional<z.ZodString>;
        flowType: z.ZodOptional<z.ZodEnum<{
            wallet: "wallet";
            cash: "cash";
            exchange: "exchange";
            deposit: "deposit";
            recover: "recover";
            withdraw: "withdraw";
        }>>;
        walletType: z.ZodCatch<z.ZodOptional<z.ZodEnum<{
            EVM: "EVM";
            SOL: "SOL";
        }>>>;
    }, z.core.$strip>>>;
    onramps: z.ZodOptional<z.ZodArray<z.ZodString>>;
    offramps: z.ZodOptional<z.ZodArray<z.ZodString>>;
    features: z.ZodOptional<z.ZodArray<z.ZodEnum<{
        BETA_EDGES: "BETA_EDGES";
        ORG_BETA_EDGES: "ORG_BETA_EDGES";
        ORG_EDGES: "ORG_EDGES";
    }>>>;
    hops: z.ZodOptional<z.ZodArray<z.ZodString>>;
    demoScenario: z.ZodOptional<z.ZodString>;
    sdkVersion: z.ZodOptional<z.ZodString>;
    sandbox: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    inputs: z.ZodOptional<z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodString]>>>;
    outputs: z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodString]>>;
    apiKey: z.ZodString;
    withdrawInputs: z.ZodOptional<z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodString]>>>;
    profileName: z.ZodOptional<z.ZodString>;
    customStyles: z.ZodOptional<z.ZodObject<{
        primaryColor: z.ZodOptional<z.ZodString>;
        backgroundColor: z.ZodOptional<z.ZodString>;
        borderColor: z.ZodOptional<z.ZodString>;
        textColor: z.ZodOptional<z.ZodString>;
        textSecondaryColor: z.ZodOptional<z.ZodString>;
        accentColor: z.ZodOptional<z.ZodString>;
        borderStyle: z.ZodOptional<z.ZodEnum<{
            SQUARE: "SQUARE";
            DEFAULT: "DEFAULT";
        }>>;
        successColor: z.ZodOptional<z.ZodString>;
        alertColor: z.ZodOptional<z.ZodString>;
        zIndex: z.ZodOptional<z.ZodNumber>;
        componentShadow: z.ZodOptional<z.ZodString>;
        backgroundStyle: z.ZodOptional<z.ZodEnum<{
            BLUR: "BLUR";
            OFF: "OFF";
        }>>;
    }, z.core.$strip>>;
    targetElementId: z.ZodOptional<z.ZodString>;
    fontName: z.ZodOptional<z.ZodString>;
    headerTitle: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    destinationAddress: z.ZodOptional<z.ZodString>;
    withdrawDestinationAddress: z.ZodOptional<z.ZodString>;
}, z.core.$loose>;
type PaymentsWidgetQueryParams = z.infer<typeof PaymentsWidgetQueryParams>;
declare enum MessageType {
    ACTION_TRANSACTION = "ACTION_TRANSACTION",
    EVENT_ORDER_STATUS = "EVENT_ORDER_STATUS",
    EVENT_ORDER_NOTIFICATIONS = "EVENT_ORDER_NOTIFICATIONS",
    EVENT_WINDOW_CLOSE = "EVENT_WINDOW_CLOSE",
    ACTION_SIGN_MESSAGE = "ACTION_SIGN_MESSAGE",
    ACTION_PROVIDER_WIDGET = "ACTION_PROVIDER_WIDGET",
    ACTION_SIGN_TYPED_DATA = "ACTION_SIGN_TYPED_DATA",
    ACTION_SIGN_AUTH_MESSAGE = "ACTION_SIGN_AUTH_MESSAGE",
    ACTION_TRIGGER_CONNECT = "ACTION_TRIGGER_CONNECT",
    ACTION_GENERATE_FEE_SPONSORSHIP_GRANT = "ACTION_GENERATE_FEE_SPONSORSHIP_GRANT",
    EVENT_RESIZE = "EVENT_RESIZE"
}
type Message = {
    type: MessageType.ACTION_TRANSACTION;
    payload: {
        transaction: TransactionRequest | SolTransactionRequest;
        messageId: string;
        chainConfig: EVMChainConfig | SolChainConfig;
    };
} | {
    type: MessageType.EVENT_ORDER_STATUS;
    payload: OrderStatus;
} | {
    type: MessageType.EVENT_ORDER_NOTIFICATIONS;
    payload: OrderNotification[];
} | {
    type: MessageType.EVENT_WINDOW_CLOSE;
    payload: undefined;
} | {
    type: MessageType.ACTION_TRIGGER_CONNECT;
    payload: undefined;
} | {
    type: MessageType.ACTION_SIGN_MESSAGE;
    payload: {
        message: string;
        messageId: string;
        ownerAddress?: Address;
    };
} | {
    type: MessageType.ACTION_PROVIDER_WIDGET;
    payload: {
        providerWidgetMode: "REDIRECT" | "POPUP";
        redirectUrl: string;
        url: string;
        workflowId: string;
    };
} | {
    type: MessageType.ACTION_SIGN_TYPED_DATA;
    payload: {
        typedData: TypedData;
        messageId: string;
        ownerAddress?: Address;
    };
} | {
    type: MessageType.ACTION_SIGN_AUTH_MESSAGE;
    payload: {
        messageId: string;
        message: string;
        address: Address;
        walletType: WalletAuthChain;
    };
} | {
    type: MessageType.ACTION_GENERATE_FEE_SPONSORSHIP_GRANT;
    payload: {
        messageId: string;
        grantPayload: string;
    };
} | {
    type: MessageType.EVENT_RESIZE;
    payload: {
        width?: number;
        height?: number;
    };
};
type MessageResponse = {
    type: MessageType.ACTION_TRANSACTION;
    payload: {
        messageId: string;
        txReceipt: TransactionReceipt | SolTransactionReceipt;
        error: null;
    } | {
        messageId: string;
        txReceipt: null;
        error: string;
    };
} | {
    type: MessageType.ACTION_SIGN_MESSAGE;
    payload: {
        messageId: string;
        signature: string;
        error: null;
    } | {
        messageId: string;
        signature: null;
        error: string;
    };
} | {
    type: MessageType.ACTION_SIGN_TYPED_DATA;
    payload: {
        messageId: string;
        signature: string;
        error: null;
    } | {
        messageId: string;
        signature: null;
        error: string;
    };
} | {
    type: MessageType.ACTION_SIGN_AUTH_MESSAGE;
    payload: {
        messageId: string;
        signature: string;
        error: null;
    } | {
        messageId: string;
        signature: null;
        error: string;
    };
} | {
    type: MessageType.ACTION_GENERATE_FEE_SPONSORSHIP_GRANT;
    payload: {
        messageId: string;
        grant: FeeSponsorshipGrant;
        error: null;
    } | {
        messageId: string;
        grant: null;
        error: string;
    };
};
declare enum WidgetLoadFailureReason {
    /** Host page's Content-Security-Policy blocked the iframe src */
    CSP_BLOCKED = "CSP_BLOCKED",
    /** Network failure: DNS, firewall, proxy, or server unreachable */
    NETWORK_FAILURE = "NETWORK_FAILURE",
    /** The iframe element was removed from the DOM by external code */
    IFRAME_REMOVED = "IFRAME_REMOVED",
    /** A browser extension or privacy tool blocked the request */
    RESOURCE_BLOCKED = "RESOURCE_BLOCKED",
    /** Unable to determine the specific failure reason */
    UNKNOWN = "UNKNOWN"
}
type WidgetLoadDiagnostics = {
    onloadFired: boolean;
    cspViolationDetected: boolean;
    cspBlockedURI: string | null;
    iframeInDOM: boolean;
    resourceTimingEntryExists: boolean;
    elapsedMs: number;
};
declare class WidgetLoadError extends Error {
    name: "WidgetLoadError";
    readonly reason: WidgetLoadFailureReason;
    readonly diagnostics: WidgetLoadDiagnostics;
    constructor(message: string, reason: WidgetLoadFailureReason, diagnostics: WidgetLoadDiagnostics);
    static isWidgetLoadError(error: unknown): error is WidgetLoadError;
}
/** Deposit/onramp group. */
interface DepositConfig {
    /** Source/funding assets (public successor of dangerouslyOverrideInputs). */
    inputs?: IAsset[];
    /** Assets received. Defaults to `[]` (no filter — all assets accepted) when unset. */
    outputs?: IAsset[];
    /** Who funds the deposit (no singular `funder`). */
    funders?: FunderRole[];
    destinationAddress?: Address;
}
/** Withdrawal/offramp group. */
interface WithdrawalConfig {
    /** Assets withdrawn. Defaults to deposit.outputs minus fiat at open time. Pass `[]` to accept all assets. */
    inputs?: IAsset[];
    /** FILTER on allowed targets — DEFERRED (no flat target today); dropped by normalizeConfig. */
    outputs?: IAsset[];
    /** Required to openWithdrawal (no fallback). */
    funder?: FunderRole;
    destinationAddress?: Address;
}
/**
 * Fee-sponsorship group. Both fields are required together (the signer is meaningless without the
 * profile name and vice-versa). The SDK signs a widget-supplied payload; it never builds it.
 */
interface FeeSponsorshipConfig {
    /** Fee-sponsorship profile name. Live-pushed to the widget (serialized to query params as `profileName`). */
    profileName: string;
    /** Pure signer: receives the widget's canonical payload string, returns ONLY the HMAC signature. */
    generateGrant: (payload: string) => Promise<string>;
}
/** @internal Dangerous internal/testing overrides; replaced wholesale on update. Out of generated docs. */
type DangerousOverrides = {
    dangerouslyOverrideApiBaseUrl?: string;
    dangerouslyOverrideHallidayDomainName?: string;
    dangerouslyOverrideIPAddress?: string;
    dangerouslyOverrideFeatureFlags?: FeatureFlags;
    dangerouslyOverrideOnramps?: RampName[];
    dangerouslyOverrideOfframps?: RampName[];
    dangerouslyOverrideFeatures?: Feature[];
    dangerouslyOverrideHops?: string[];
    dangerouslyOverrideDemoScenario?: string;
};
/** Public, nested SDK configuration accepted by `HallidayPayments`. */
interface HallidayPaymentsConfig {
    apiKey: string;
    sandbox?: boolean;
    owner?: Owner;
    /** Request handler invoked when the widget asks the host to connect a wallet (renamed from onConnectUserWallet). */
    onConnectWallet?: () => void;
    /** Fee-sponsorship group; both fields required together. Signer signs a widget-supplied payload. */
    feeSponsorship?: FeeSponsorshipConfig;
    deposit?: DepositConfig;
    withdrawal?: WithdrawalConfig;
    customStyles?: CustomStyles;
    fontName?: string;
    headerTitle?: string;
    /** present ⇒ EMBED; absent ⇒ MODAL */
    targetElementId?: string;
    /** @internal */ autoPreload?: boolean;
    /** @internal */ instanceId?: string;
    /** @internal */ dangerousOverrides?: DangerousOverrides;
}
type HallidayEvent = "status" | "error" | "close";
type HallidayErrorSource = "preload" | "openDeposit" | "openWithdrawal" | "resolution" | "load";
type HallidayRuntimeError = (WidgetLoadError | Error) & {
    source: HallidayErrorSource;
};
type HallidayEventHandler<E extends HallidayEvent> = E extends "status" ? (s: {
    type: string;
    payload: OrderStatus;
}) => void : E extends "error" ? (e: HallidayRuntimeError) => void : () => void;
interface HallidaySnapshot {
    isReady: boolean;
    isOpen: boolean;
    status: {
        type: string;
        payload: OrderStatus;
    } | null;
    error: HallidayRuntimeError | null;
    notifications: OrderNotification[];
}

/** Deposit open input — the session minus the method-injected `direction`. */
declare const DepositSession: z.ZodObject<{
    output: z.ZodOptional<z.ZodString>;
    input: z.ZodOptional<z.ZodObject<{
        asset: z.ZodString;
        amount: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    inputFiatValue: z.ZodOptional<z.ZodObject<{
        currency: z.ZodString;
        amount: z.ZodString;
    }, z.core.$strip>>;
    fundingAddress: z.ZodOptional<z.ZodString>;
    destination: z.ZodOptional<z.ZodString>;
    locked: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, z.core.$strip>;
/** Withdraw open input — no `direction` (injected) and no `fundingAddress` (meaningless for a single withdraw funder). */
declare const WithdrawSession: z.ZodObject<{
    output: z.ZodOptional<z.ZodString>;
    input: z.ZodOptional<z.ZodObject<{
        asset: z.ZodString;
        amount: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    inputFiatValue: z.ZodOptional<z.ZodObject<{
        currency: z.ZodString;
        amount: z.ZodString;
    }, z.core.$strip>>;
    destination: z.ZodOptional<z.ZodString>;
    locked: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, z.core.$strip>;
/**
 * The single instance-based SDK entry point. One object owns the config, state, render pipeline,
 * messaging, lifecycle, and every entry point. Construction is pure and SSR-safe; warming is automatic.
 *
 * **All methods are arrow-bound class fields** so they can be detached safely — React destructuring,
 * `onClick={openDeposit}`, and `useSyncExternalStore(core.subscribe, core.getSnapshot)`. A detached
 * prototype method would lose `this` and throw.
 */
declare class HallidayPayments {
    /**
     * Monotonic per-process counter for the bare-instance DOM-key fallback — guarantees two
     * `{ apiKey }`-only instances (no `instanceId`/`targetElementId`) never share a key or DOM id.
     */
    private static _seq;
    /** Per-instance engine context (DOM ids, state, generation guard, reactive store). */
    private readonly _ctx;
    /** Canonical flat config (validated, default-baked) + injected bridge callbacks. */
    private _config;
    /** Latest-wins host wallet-connect hook; the registered handler always calls the current value. */
    private _userConnect;
    /** Latest-wins host fee-sponsorship signer; the stable proxy always calls the current value. */
    private _userGenerateGrant;
    /** Source tag for the next non-load runtime error. */
    private _lastSource;
    /** Whether this instance has lazily joined the dev registry (first DOM touch). */
    private _registered;
    /** Memoized readiness promise for the current load cycle. */
    private _ready;
    /** True once the current cycle rejected — a genuine (re)load re-arms readiness. */
    private _readyFailed;
    /** True once `ready()` has been obtained — half of the "is an error channel wired?" check. */
    private _readyAwaited;
    private readonly _listeners;
    constructor(config: HallidayPaymentsConfig);
    /**
     * Resolves on the widget's ready message (`WIDGET_READY`/`HALLIDAY_READY`); rejects with a
     * `WidgetLoadError` on load failure, async open-time failure, or the fixed 30s timeout. Memoized per
     * load cycle — `destroy()` clears it and the next genuine (re)load installs a fresh one; a no-reload
     * `updateConfig` does not reset it.
     */
    ready: () => Promise<void>;
    /** Tear down listeners, iframe, DOM, the memoized `ready()`, and reset state. */
    destroy: () => void;
    /**
     * Open the deposit/payment flow (EMBED if `targetElementId` is set, else MODAL). Opens on defaults.
     *
     * A `session` is optional: when passed it is validated synchronously (throws at the call site on a
     * **structurally malformed** session) and delivered to the widget with `direction:"inbound"` injected.
     * It never throws for an incomplete-but-valid or absent session. A zero-arg `openDeposit()` sends **no**
     * session, preserving show-only re-show / in-progress state.
     */
    openDeposit: (session?: z.input<typeof DepositSession>) => void;
    /**
     * Open the withdrawal flow. Throws synchronously when the stored config is incomplete or
     * when a passed `session` is structurally malformed. Always emits an **outbound** session (even zero-arg)
     * — the replacement for the retired `sessionType:"withdraw"` signal; `direction:"outbound"` is injected.
     */
    openWithdrawal: (session?: z.input<typeof WithdrawSession>) => void;
    /** Show the existing widget on the activity/history view. Throws synchronously if no widget exists. */
    openActivity: () => void;
    /** Show the existing widget on the history view with a specific order targeted. Throws synchronously if no widget exists. */
    openOrder: (paymentId: string) => void;
    /** Hide the widget (kept alive for reuse). */
    close: () => void;
    /** Merge new params and push them to the live widget (never shows). Nested → flat → shallow-merge. */
    updateConfig: (partial: Partial<HallidayPaymentsConfig>) => void;
    on: <E extends HallidayEvent>(event: E, handler: HallidayEventHandler<E>) => (() => void);
    off: <E extends HallidayEvent>(event: E, handler: HallidayEventHandler<E>) => void;
    /** @internal Warm a hidden iframe so the next open is instant. Idempotent (the generation guard ensures
     *  at most one iframe). Runs automatically after construction; a `preload()` after `destroy()` rebuilds. */
    preload: () => void;
    /** @internal Subscribe to reactive-state changes; returns an unsubscribe fn (useSyncExternalStore). */
    subscribe: (listener: () => void) => (() => void);
    /** @internal Cached, referentially-stable snapshot of reactive state. */
    getSnapshot: () => HallidaySnapshot;
    get isReady(): boolean;
    get isOpen(): boolean;
    /** Stable host-connect proxy — always calls the current `onConnectWallet`. */
    private _connectProxy;
    /** Stable host signer proxy — always calls the current `generateFeeSponsorshipGrant` (signs a payload → signature). */
    private _grantProxy;
    /** Run an effecting action through the DOM-ready gate, registering lazily on first DOM touch. */
    private _gatedEffect;
    private _registerLazily;
    /** The single resolved per-instance key (also the DOM-id namespace), fixed at construction. Unifying
     *  on `ctx.key` keeps the registry key and DOM ids in lock-step — and never drifts if a later
     *  `updateConfig` changes `targetElementId`. */
    private _registryKey;
    /** Withdrawal inputs: explicit `withdrawal.inputs` (honored even if empty), else `deposit.outputs` minus fiat at open time. */
    private _resolveWithdrawInputs;
    private _maybeCreateSkeleton;
    /**
     * Push the resolved diff of a serializable-only `updateConfig` to the live widget, without re-resolving
     * wallets. The wire carries ONLY the keys that changed (from `flat`), each resolved against the
     * just-committed `this._config`: still-present → its committed value (a cleared-but-re-defaulted `outputs`
     * rides out as the DEFAULT here); now-absent (an optional field that was cleared) → an explicit `null`, so
     * the widget's own `mergeParams` DELETES it live. `this._config` is null-free, so no `null` ever leaks
     * except an intentional clear.
     */
    private _pushParamUpdate;
    /** Begin (or re-arm after a failure) the readiness cycle for a genuine (re)load. */
    private _beginLoadCycle;
    private _armReadyCycle;
    private _handleWidgetReady;
    private _handleStatus;
    private _handleNotifications;
    private _handleError;
    private _handleClose;
    private _emit;
    /**
     * Surface a runtime/async failure: tag with `source`, store it, reject `ready()`, emit `"error"`,
     * and dev-warn when no channel is wired. Never throws.
     */
    private _reportError;
}

/**
 * Serialize the query params to a base64 string.
 *
 * @param {PaymentsWidgetQueryParams} data {{@link PaymentsWidgetQueryParams}} The query params to serialize.
 * @returns The serialized (base64) query params
 */
declare const serializeQueryParams: (data: PaymentsWidgetQueryParams) => string;
/**
 * Deserialize the query params from a base64 string.
 *
 * @param {string} serialized The base64 string to deserialize.
 * @returns {{@link PaymentsWidgetQueryParams}} The deserialized query params.
 */
declare const deserializeQueryParams: (serialized: string) => PaymentsWidgetQueryParams;
/**
 * Get the URL for the payments widget.
 *
 * @param {PaymentsWidgetQueryParams & { windowOrigin?: string }} params {{@link PaymentsWidgetQueryParams}} The query params to serialize.
 * @returns The URL for the payments widget.
 */
declare const getPaymentsWidgetUrl: (params: PaymentsWidgetQueryParams & {
    windowOrigin?: string;
}) => string;

/**
 * Shallow-merge `next` into `prev`. CONTRACT: an explicit `null` in `next` CLEARS the key — it is
 * DELETED from the result, not stored as `null`. `undefined` still overrides the value in place.
 * This is the single "null = clear" primitive shared by the SDK (`updateConfig`/`pipeline`) and the
 * widget's live-update path (`applyParamsUpdate`), so a cleared key becomes cleanly absent on both
 * sides — no `null` is ever stored. Pinned by the unit test in state.test.ts.
 */
declare const mergeParams: <T extends Record<string, unknown>>(prev: T, next: Partial<T>) => T;

export { Address, AppMode, BackgroundStyle, BorderStyle, CssFontSize, CustomStyles, FeeSponsorshipGrant, FontName, HallidayPayments, HeaderTitle, MessageType, OrderNotification, OrderStatus, OwnerMeta, PaymentDirection, PaymentFlowType, PaymentSession, PaymentsWidgetQueryParams, PaymentsWidgetSDKParams, UserWalletFunderDisplay, WalletAuthChain, WalletMeta, WalletVm, WidgetLoadError, WidgetLoadFailureReason, WindowType, HallidayPayments as default, deserializeQueryParams, getPaymentsWidgetUrl, mergeParams, serializeQueryParams };
export type { DangerousOverrides, DepositConfig, EvmFunderRole, EvmWalletRole, FeatureFlags, FeeSponsorshipConfig, FunderRole, HallidayErrorSource, HallidayEvent, HallidayEventHandler, HallidayPaymentsConfig, HallidayRuntimeError, HallidaySnapshot, Message, MessageResponse, Owner, OwnerRole, SendTransaction, SignAuthMessage, SignMessage, SignTypedData, SolFunderRole, SolSendTransaction, WalletActionsType, WidgetLoadDiagnostics, WithdrawalConfig };
