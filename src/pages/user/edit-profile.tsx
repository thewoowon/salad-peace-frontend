import { gql, useApolloClient, useMutation } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import { useMe } from "../../hooks/useMe";
import saladPeace_1 from '../../images/saladPeace_1.svg';
import {
    editProfile,
    editProfileVariables,
  } from "../../__generated__/editProfile";

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile($input: EditProfileInput!,$buildingCode:String!) {
    editProfile(input: $input, buildingCode:$buildingCode) {
      ok
      error
    }
  }
`;

interface IFormProps {
  email?: string;
  password?: string;
  buildingCode?: string;
}

export const EditProfile = () => {
  const { data: userData } = useMe();
  const client = useApolloClient();
  const onCompleted = (data: editProfile) => {
    const {
      editProfile: { ok },
    } = data;
    if (ok && userData) {
        const {
          me: { email: prevEmail, id },
        } = userData;
        const { email: newEmail } = getValues();
        if (prevEmail !== newEmail) {
          client.writeFragment({
            id: `User:${id}`,
            fragment: gql`
              fragment EditedUser on User {
                verified
                email
              }
            `,
            data: {
              email: newEmail,
              verified: false,
            },
          });
        }
      }
  };
  const [editProfile, { loading }] = useMutation<
    editProfile,
    editProfileVariables
  >(EDIT_PROFILE_MUTATION, {
    onCompleted,
  });
  const { register, handleSubmit, getValues, formState } = useForm<IFormProps>({
    mode: "onChange",
    defaultValues: {
      email: userData?.me.email,
    },
  });
  const onSubmit = () => {
    const { email, password, buildingCode } = getValues();
    editProfile({
      variables: {
        input: {
          email,
          ...(password !== "" && { password }),
        },
        buildingCode: buildingCode ? buildingCode : "",
      },
    });
  };
  return (
    <div className="min-h-full flex flex-col items-center lg:mt-6 xl:mt-8 2xl:mt-10">
        <Helmet>
            <title>회원 정보 수정 - 샐러드피스</title>
        </Helmet>
      <div className="w-full max-w-sm flex flex-col px-5 items-center">
      <a href="/edit-profile"><img src={saladPeace_1} alt="SaladPeace"></img></a>
      <h4 className="font-semibold text-2xl mb-3">프로필 수정</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
      >
        <input
          {...register("email",{
            pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
          className="h-12 rounded-md border px-5 focus:outline-none focus:bg-purple-100 transition-colors"
          type="email"
          placeholder="이메일을 입력해주세요."
        />
        <input
          {...register("password")}
          className="h-12 rounded-md border px-5 focus:outline-none focus:bg-purple-100 transition-colors"
          type="password"
          placeholder="비밀번호를 입력해주세요."
        />
        <input
          {...register("buildingCode")}
          className="h-12 rounded-md border px-5 focus:outline-none focus:bg-purple-100 transition-colors"
          type="text"
          placeholder="빌딩코드를 입력해주세요."
        />
        <Button
          loading={loading}
          canClick={formState.isValid}
          actionText="프로필 저장"
        />
      </form>
      </div>
    </div>
  );
};