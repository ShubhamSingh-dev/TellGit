import React from "react";

type Props = {
    params: Promise<{ meetingId: string }>;
};

const MeetingDetailsPage = async ({ params }: Props) => {
    const { meetingId } = await params;
    return (
        <div>
            <h1>Meeting Details {meetingId}</h1>
        </div>
    );
};

export default MeetingDetailsPage;